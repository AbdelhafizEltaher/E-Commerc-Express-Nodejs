const User = require('../Models/UserModel')
var bcrypt = require('bcrypt')




async function UpdateUserData(userID,data){
    if(data.password){
        var salt = await bcrypt.genSalt(10)
        var hashdata = bcrypt.hashSync(data.password, salt)
        data.password = hashdata
    }
    return await User.findByIdAndUpdate(userID, { $set: data, }, { new: true, runValidators: true })    
}



async function DeletUser(userID){
    const admin = await User.findOne({IsAdmin:true})
    const user =await User.findById(userID)
    console.log(user);
    if(user == null){
        return "InCorrrect ID"

    }
    else if (admin.id === userID){
        return "You Can't Delet Admin Account"

    }
    else{
        
        await User.findByIdAndDelete(userID) 
        return "User Has Been Deleted"
    }
        
}




async function GetUserByID(userID){
    return await User.findById(userID)
}



async function GetAllUser(newOption,skip,limit){
    if (newOption) {
        return await User.find().sort({ _id: -1 }).limit(limit)
    }
    else {
        if (skip) {
            return await User.find().skip(skip).limit(limit)
        }
        else {
            return await User.find()
        }
    }
}



async function GetUsersStats(){
    const date = new Date()
    const LastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    return await User.aggregate([
        {
            $match: { createdAt: { $gte: LastYear } }
        },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: { _id: "$month", total: { $sum: 1 } }
        }

    ])
     
}


module.exports={UpdateUserData,DeletUser,GetUserByID,GetAllUser,GetUsersStats}