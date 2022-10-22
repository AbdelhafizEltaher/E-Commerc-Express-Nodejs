const express = require('express')
const router = express.Router()
const {UpdateSellerData , DeletSeller , GetSellerByID , GetAllSellers ,GetUSellerStats}= require('../Controlers/SellerControl')
const { VerfiyToken, VerfiyAuthorization, VerfiyAdmin } = require('./VerifyToken')
// Updating Seller
router.put("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const UpdatedSeller = await UpdateSellerData(request.params.id, request.body)
        if (UpdatedSeller == null) {
            response.status(401).json("InCorrrect ID")
        }
        else {
            const { password, ...others } = UpdatedSeller._doc
            response.status(201).json(others)
        }
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
// Deleteing Seller
router.delete("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const DeletedSeller = await DeletSeller(request.params.id)
        if (DeletedSeller == null) {
            response.status(401).json("InCorrrect ID")
        }
        else {
            response.status(201).json("User Has Been Deleted")
        }
    }
    catch (error) {
        response.status(401).json(error.message)
    }

})
// Getting  Seller By His ID Only By Admin
router.get("/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const UserData = await GetSellerByID(request.params.id)
        if (UserData == null) {
            response.status(401).json("InCorrrect ID")
        }
        else {
            const { password, ...others } = UserData._doc
            response.status(201).json(others)
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

// Getting All Sellers Only By Admin
router.get("/", VerfiyAdmin, async function (request, response, next) {

    try {
        const NewOption = request.query.new
        const Skip = request.query.Skip || 0
        const limit = request.query.limit || 5
        var UsersData = await GetAllSellers(NewOption,Skip,limit);
        response.status(201).json(UsersData)
    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

// Getting All Seller Stats Only By Admin
router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {

    try {
        const data = await GetUSellerStats()
        response.status(200).json(data)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
module.exports = router


