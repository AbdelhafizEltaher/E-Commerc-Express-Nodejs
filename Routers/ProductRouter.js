const router = require('express').Router()
const { AddProduct, UpdateProductData, GetALLProduct, GetALLProductBYID,DeletProduct,GetProductStats} = require('../Controlers/ProductControler')
const { VerfiyAuthorization, VerfiyAdmin, VerfiySeller } = require('./VerifyToken')
// seller can add his own products 

router.post("/", VerfiySeller, async function (request, response, next) {
    try {
        const product = await AddProduct(request.User.id,request.body)
        const {SellerID,...others}=product._doc
        response.status(200).json(others)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

// seller can update his own product
router.put("/:id", VerfiySeller, async function (request, response, next) {
    try {
        const product = await UpdateProductData(request.params.id,request.User.id,request.body)

        if(product){
            const {SellerID,...others}=product._doc
            response.status(200).json(others)
        }
        else{
            response.status(401).json("You Are Not Allowed To Do That")
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
// every one can  search for products  By ID
router.get("/:id", async function (request, response, next) {
    try {
        const product = await GetALLProductBYID(request.params.id)
        if(product){
            const {SellerID,...others}=product._doc

            response.status(200).json(others)
        }
        else{
            response.status(401).json("InCorrect ID")

        }

}
    catch (error) {
        response.status(401).json(error.message)
    }
})
// EveryOne can get products By Latest added Or Categorie
router.get("/", async function (request, response, next) {
    try {
        const Qnew = request.query.new 
        const QCategori = request.query.categori
        const QTitle = request.query.title
        const QUpdated = request.query.updated
        const UserName = request.query.seller
        const product = await GetALLProduct(Qnew,QCategori,QTitle,QUpdated,UserName)
        
        if(product){
            response.status(200).json(product)
        }
        else{
            response.status(401).json("Empty List")

        }

}
    catch (error) {
        response.status(401).json(error.message)
    }
})
// seller can delete any specific products  
router.delete("/:id", VerfiySeller, async function (request, response, next) {
    try {
        const message = await DeletProduct(request.params.id,request.User.id)
            response.status(200).json(message)

}
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {

    try {
        const data = await GetProductStats()
        response.status(200).json(data)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
module.exports = router