const Product = require('../Models/ProductModel')
const Seller = require('../Models/SellerModel')
ObjectId = require('mongodb').ObjectID

async function AddProduct(Sell_Id, RequestData) {
    var ProductData = RequestData
    const NewProduct = new Product({
        Title: ProductData.Title,
        Description: ProductData.Description,
        Img: ProductData.Img,
        Size: ProductData.Size,
        Color: ProductData.Color,
        Price: ProductData.Price,
        Categories: ProductData.Categories,
        SellerID: Sell_Id,
    })
    return NewProduct.save()
}
async function UpdateProductData(ProductID,Sell_Id,data) {


    const product= await Product.findByIdAndUpdate(ProductID)
    if(product){
        if(product.SellerID.toString() === Sell_Id){
            return await Product.findByIdAndUpdate(ProductID, { $set: data, }, { new: true, runValidators: true })
        }
    }
}
async function GetALLProduct(Qnew, QCategori,QTitle,Qupdated,sellername) {
    if (Qnew) {
        return await Product.find().sort({ createdAt: -1 }).limit(5)
    }
    else if(QTitle){
        return await Product.findOne({Title:QTitle})
    }
    else if (QCategori) {
        return await Product.find({ Categories: { $in: [QCategori] } })
    }

    else if(Qupdated){
        return await Product.find().sort({ updatedAt: -1 }).limit(5)

    }
    else if(sellername){
        const seller= await Seller.findOne({FullName:sellername})
        if(seller){
            return await Product.find({SellerID:seller.id})
        }
    }
    else {
        return await Product.find()
    }
}
async function GetALLProductBYID(ProductID) {
    return await Product.findById(ProductID)
}
async function DeletProduct(ProductID, Sell_Id) {
    const product = await Product.findOne({ _id: ProductID, SellerID: Sell_Id })
    if (product == null) {
        return "InCorrect ProductID Or That Product Not Yours So you Can't Delete"
    }
    else {
        await Product.findOneAndDelete({ _id: ProductID, SellerID: Sell_Id })
        return "User Has Been Deleted"
    }
}

async function GetProductStats(){
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await Product.aggregate([
        {
            $match: { createdAt: { $gte: LastYear } }
        },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: { _id: "$month", total: { $sum: 1 } }
        }

    ])
     
}

module.exports = { AddProduct, UpdateProductData, GetALLProduct, GetALLProductBYID, DeletProduct ,GetProductStats}