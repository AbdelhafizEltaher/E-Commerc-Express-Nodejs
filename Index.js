const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const AuthRouter = require('./Routers/UserAuthentecation')
const UserRouter = require('./Routers/UserRoute')
const AuthSeller = require('./Routers/SellerAuthentication')
const SellerRouter = require('./Routers/SellerRouter')
const ProductRouter = require('./Routers/ProductRouter')
const OrderRouter = require('./Routers/OrderRouter')



dotenv.config()

mongoose.connect(process.env.DATABASE)
mongoose.connection.on("connected", function () {
    console.log("Mongoose Connected to DB");
})
mongoose.connection.on("error", function (error) {
    console.log(error.message);
})
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose Connection is Disconnected");
})
process.on('SIGINT', async function () {
    await mongoose.connection.close()
    process.exit(0)
})



var app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use("/api/KarKeeb/User/Auth",AuthRouter)
app.use("/api/KarKeeb/User",UserRouter)
app.use("/api/KarKeeb/Seller/Auth",AuthSeller)
app.use("/api/KarKeeb/Seller",SellerRouter)
app.use("/api/KarKeeb/Product",ProductRouter)
app.use("/api/KarKeeb/Order",OrderRouter)


// app.use("/api/KarKeeb/Product",ProductRouter)




app.use('*', function (req, res, next) {
    res.status(404).redirect('/not-found');
});

app.listen(process.env.PORT | 3000, function () {
    console.log("successfully Listening");
})