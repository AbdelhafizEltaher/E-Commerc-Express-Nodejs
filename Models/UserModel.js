const mongoose = require("mongoose")
var bcrypt = require('bcrypt')
var UserSchema = mongoose.Schema({

    UserName: { type: String, required: true, unique: true, toLowerCase: true, trim: true },
    Email: { type: String, required: true, unique: true },
    password: { type: String, minLenngth: 6, required: true },
    FullName: { type: String, required: true, minLenngth: 3 },
    IsAdmin: { type: Boolean, default: false }
},

    { timestamps: true })
UserSchema.pre('save', async function (next) {
    try {
        var salt = await bcrypt.genSalt(10)
        var hashdata = bcrypt.hashSync(this.password, salt)
        this.password = hashdata
        next()
    } catch (error) {
        next(error)
    }
})




var User = mongoose.model("User", UserSchema)
module.exports = User




