const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const { UpdateUserData, DeletUser, GetUserByID , GetAllUser , GetUsersStats} = require('../Controlers/UserControlers')

const { VerfiyToken, VerfiyAuthorization, VerfiyAdmin } = require('./VerifyToken')

// Updating user
router.put("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const UpdatedUser = await UpdateUserData(request.params.id, request.body)
        if (UpdatedUser == null) {
            response.status(401).json("InCorrrect ID")
        }
        else {
            const { password, ...others } = UpdatedUser._doc
            response.status(201).json(others)
        }
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

// Deleteing User
router.delete("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const message = await DeletUser(request.params.id)
     
            response.status(201).json(message)
        
    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

// Getting  User By His ID Only By Admin
router.get("/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const UserData = await GetUserByID(request.params.id)
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

// Getting All Users Only By Admin
router.get("/", VerfiyAdmin, async function (request, response, next) {

    try {
        const NewOption = request.query.new
        const Skip = request.query.Skip || 0
        const limit = request.query.limit || 5
        var UsersData = await GetAllUser(NewOption,Skip,limit);
        response.status(201).json(UsersData)
    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

// Getting All Site Stats Only By Admin
router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {

    try {
        const data = await GetUsersStats()
        response.status(200).json(data)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
module.exports = router


