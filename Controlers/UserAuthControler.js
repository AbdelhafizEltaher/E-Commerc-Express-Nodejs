const User = require('../Models/UserModel')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

// register Function Process

async function Register(RequestData) {

    var UserData = RequestData
    const NewUser = new User({
        UserName: UserData.UserName,
        Email: UserData.Email,
        password: UserData.password,
        FullName: UserData.FullName
    })
    return NewUser.save()
}

// Login Function Process

async function Login(RequestData) {

    var UserData = RequestData
    const StoredUser = await User.findOne({ UserName: UserData.UserName })
    if (StoredUser === null) {
        return { status: 401, result: "InCorrect UserName" }
    }
    else {
        const VerifyPassword = bcrypt.compareSync(UserData.password, StoredUser.password)
        if (VerifyPassword === false) {
            return { status: 401, result: "InCorrect Password" }
        }
        else {
            const { password,IsAdmin,...others } = StoredUser._doc
            const AccessToken = jwt.sign({
                id: StoredUser.id, IsAdmin: StoredUser.IsAdmin, FullName: StoredUser.FullName
            }, process.env.SECRET_KEY, {
                expiresIn: "5h"
            })
            return { status: 200, result: { ...others, AccessToken } }
        }
    }
}

module.exports = { Register, Login }