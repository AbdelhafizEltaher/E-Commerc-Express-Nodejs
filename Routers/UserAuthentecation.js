const express = require('express')
const router = express.Router()
const {Register,Login , logOut}=require('../Controlers/UserAuthControler')


// --------------------- registeration Process

router.post("/Register", async function (request, response, next) {
    try {
        const SavedUser=  await Register(request.body)
        const {password,IsAdmin,...others}=SavedUser._doc
        response.status(200).json( others )
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



router.post("/LogOut", async function (request, response, next) {
    const isLoggedOut =await logOut(request.body)
  
    isLoggedOut? response.status(200).json('تم تسجيل الخروج بنجاح') : response.status(500).json('لقد حدث خطا ما')
  })

module.exports = router
