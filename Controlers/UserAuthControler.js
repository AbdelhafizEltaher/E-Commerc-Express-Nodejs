const User = require('../Models/UserModel')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// register Function Process

async function Register(req) {
    const NewUser = new User({
        fullName: req.fullName,
        Email: req.Email,
        userName: req.userName,
        PassWord: req.PassWord,
        Mobile: req.Mobile,
        telphone: req.telphone
    })
    return NewUser.save()
}


async function RegisterAdmin(req) {

    const NewUser = new User({
        fullName: req.fullName,
        Email: req.Email,
        userName: req.userName,
        PassWord: req.PassWord,
        Mobile: req.Mobile,
        telphone: req.telphone,
        IsAdmin: true,
    })
    return NewUser.save()
}


// Login Function Process

async function Login(RequestData) {

    const StoredUser = await User.findOne({ userName: RequestData.userName })
    if (StoredUser === null) {
        return { status: 401, result: "InCorrect UserName" }
    }
    else {
        const VerifyPassword = await bcrypt.compare(RequestData.PassWord, StoredUser.PassWord)
        if (VerifyPassword === false) {
            return { status: 401, result: "InCorrect Password" }
        }
        else {

            StoredUser.isActive = true
            let x = await User.findByIdAndUpdate(StoredUser.id, { $set: StoredUser, }, { new: true, runValidators: true })

            const { password, IsAdmin, ...others } = StoredUser._doc
            const AccessToken = jwt.sign({
                id: StoredUser.id, IsAdmin: StoredUser.IsAdmin, fullName: StoredUser.fullName
            }, process.env.SECRET_KEY, {
                expiresIn: "5h"
            })
            return { status: 200, result: { ...others, AccessToken } }
        }
    }
}



async function logOut(RequestData) {
    const StoredUser = await User.findById(RequestData.id)
    StoredUser.isActive = false
    return await User.findByIdAndUpdate(StoredUser.id, { $set: StoredUser, }, { new: true, runValidators: true })

}

module.exports = { Register, RegisterAdmin, Login, logOut }