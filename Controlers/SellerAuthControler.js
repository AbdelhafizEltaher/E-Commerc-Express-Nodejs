const Seller = require('../Models/SellerModel')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// register Function Process

async function RegisterSeller(RequestData) {

    var SellerData = RequestData
    const NewSeller = new Seller({
        UserName: SellerData.UserName,
        Email: SellerData.Email,
        password: SellerData.password,
        FullName: SellerData.FullName,
    })
    return NewSeller.save()
}

// Login Function Process

async function LoginSeller(RequestData) {

    var SellerData = RequestData
    const StoredSeller = await Seller.findOne({ UserName: SellerData.UserName })
    if (StoredSeller === null) {
        return { status: 401, result: "InCorrect UserName" }
    }
    else {
        const VerifyPassword = bcrypt.compareSync(SellerData.password, StoredSeller.password)
        if (VerifyPassword === false) {
            return { status: 401, result: "InCorrect Password" }
        }
        else {
            const { password, ...others } = StoredSeller._doc
            const AccessToken = jwt.sign({
                id: StoredSeller.id, FullName: StoredSeller.FullName
            }, process.env.SECRET_KEY, {
                expiresIn: "5h"
            })
            return { status: 200, result: { ...others, AccessToken } }
        }
    }
}

module.exports = { RegisterSeller, LoginSeller }