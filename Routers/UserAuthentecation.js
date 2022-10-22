const express = require('express')
const router = express.Router()
const {Register,Login}=require('../Controlers/UserAuthControler')


// --------------------- registeration Process

router.post("/Register", async function (request, response, next) {
    try {
        const SavedUser=  await Register(request.body)
        const {password,IsAdmin,...others}=SavedUser._doc
        response.status(201).json( others )
    }
    catch (error) {
        response.status(500).json(error.message)
    }

})

// --------------------- Login Process


router.post("/Login", async function (request, response, next) {
  const {status,result} =await Login(request.body)

response.status(status).json(result)
})

module.exports = router
