const mongoose = require("mongoose")
var bcrypt = require('bcrypt')
var SellerSchema = mongoose.Schema({

    UserName: { type: String, required: true, unique: true, toLowerCase: true, trim: true },
    Email: { type: String, required: true, unique: true },
    password: { type: String, minLenngth: 6, required: true },
    FullName: { type: String, required: true, minLenngth: 3 }
},

    { timestamps: true })

SellerSchema.pre('save', async function (next) {
    try {
        var salt = await bcrypt.genSalt(10)
        var hashdata = await bcrypt.hash(this.password, salt)
        this.password = hashdata
        next()
    } catch (error) {
        next(error)
    }
})

var Seller = mongoose.model("Seller", SellerSchema)
module.exports = Seller