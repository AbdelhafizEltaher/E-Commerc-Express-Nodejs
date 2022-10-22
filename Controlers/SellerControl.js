const Seller = require('../Models/SellerModel')
const bcrypt= require('bcrypt')
async function UpdateSellerData(SellerID,data){
    if(data.password){
        var salt = await bcrypt.genSalt(10)
        var hashdata = bcrypt.hashSync(data.password, salt)
        data.password = hashdata
    }
    return await Seller.findByIdAndUpdate(SellerID, { $set: data, }, { new: true, runValidators: true })    
}
async function DeletSeller(SellerID){
    const seller =await Seller.findById(SellerID)
    if(seller == null){
        return "InCorrrect ID"
    }
    else{
        await Seller.findByIdAndDelete(SellerID) 
        return "User Has Been Deleted"
    }}
async function GetSellerByID(SellerID){
    return await Seller.findById(SellerID)
}
async function GetAllSellers(newOption,skip,limit){
    if (newOption) {
        return await Seller.find().sort({ _id: -1 }).limit(limit)
    }
    else {
        if (skip) {
            return await Seller.find().skip(skip).limit(limit)
        }
        else {
            return await Seller.find()
        }
    }
}


async function GetUSellerStats(){
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await Seller.aggregate([
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



module.exports={UpdateSellerData , DeletSeller , GetSellerByID , GetAllSellers ,GetUSellerStats}