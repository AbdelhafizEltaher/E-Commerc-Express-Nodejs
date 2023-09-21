const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({


    fullName:{type : String , minLenght:3 , maxLenght:50 , required : true , toLowerCase : true , trim : true},
    userName:{type : String , minLenght:3 , maxLenght:50 , required : true ,  toLowerCase : true , unique : true , trim : true},
    Email:{type : String , minLenght:10 , maxLenght:50 , required : true , unique : true , trim : true},
    PassWord:{type : String , minLenght:8 , maxLenght:50 , required : true , trim : true},
    Mobile:{type : String , minLenght:11 , maxLenght:11 , required : true , trim : true , unique : true},
    telphone:{type : String , minLenght:8 , maxLenght:14 , trim : true , unique : true},
    IsAdmin:{type : Boolean , minLenght:3 , maxLenght:50 , default : false },
    isActive:{type : Boolean , default:false}

}
,

{timesStamp : true}

)



UserSchema.pre('save', async function (next) {
    try {
        var salt =  bcrypt.genSaltSync(10)
        var hashdata = bcrypt.hashSync(this.PassWord, salt)
        this.PassWord = hashdata
        next()
    } catch (error) {
        next(error)
    }
})
const User = mongoose.model("User", UserSchema)
module.exports = User

























// const mongoose = require("mongoose")
// var bcrypt = require('bcrypt')
// var UserSchema = mongoose.Schema({

//     UserName: { type: String, required: true, unique: true, toLowerCase: true, trim: true },
//     Email: { type: String, required: true, unique: true },
//     password: { type: String, minLenngth: 6, required: true },
//     FullName: { type: String, required: true, minLenngth: 3 },
//     IsAdmin: { type: Boolean, default: false }

// },

//     { timestamps: true })

// UserSchema.pre('save', async function (next) {
//     try {
//         var salt = await bcrypt.genSalt(10)
//         var hashdata = bcrypt.hashSync(this.password, salt)
//         this.password = hashdata
//         next()
//     } catch (error) {
//         next(error)
//     }
// })




// var User = mongoose.model("User", UserSchema)
// module.exports = User




