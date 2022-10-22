
const mongoose = require("mongoose")
var ProductSchema = mongoose.Schema({
    Title: { type: String, required: true, unique: true, toLowerCase: true, trim: true },
    Description: { type: String },
    Img: { type: String, required: true },
    Size: { type: String },
    Color: { type: String },
    Price: { type: Number },
    ProductAmount:{type: Number , default:1},
    Categories: { type: Array },
    SellerID: { type: mongoose.Schema.ObjectId, ref: "Seller", required: true }
},    { timestamps: true })


var Product = mongoose.model("Product", ProductSchema)
module.exports = Product