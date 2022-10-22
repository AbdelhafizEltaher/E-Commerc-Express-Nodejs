const express = require('express')
const router = express.Router()
const { RegisterSeller, LoginSeller }=require('../Controlers/SellerAuthControler')


// --------------------- registeration Process

router.post("/Register", async function (request, response, next) {
    try {
        const SavedUser=  await RegisterSeller(request.body)
        const {password,...others}=SavedUser._doc
        response.status(201).json( others )
    }
    catch (error) {
        response.status(500).json(error.message)
    }

})

// --------------------- Login Process


router.post("/Login", async function (request, response, next) {
  const {status,result} =await LoginSeller(request.body)

response.status(status).json(result)
})

module.exports = router
