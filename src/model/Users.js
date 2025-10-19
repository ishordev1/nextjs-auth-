const { default: mongoose } = require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minLength:[6,"Password must be at least 6 characters long"]
    },
    about:String,
    profileUrl:String
})
export const User=mongoose.models.Users || mongoose.model("Users",userSchema);

// export const User=mongoose.models.User <-- if thsi is false then next is execute
//  