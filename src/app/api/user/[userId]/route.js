import { connectionDB } from "@/lib/ConnectionDB";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { userId } = await params;
    let users=[]
try{
     await  connectionDB()
   users= await  User.findById(userId).select("-password");
if(!users){
    return NextResponse.json({message:"User not found"}, {status:404});
}
return NextResponse.json({message:"User fetched successfully", users}, {status:200});
}
catch(err){
    console.log("Error in fetching user by ID");
    console.log(err);
    return NextResponse.json({message:"Error in fetching user by ID"}, {status:500});
}
}


export async function DELETE(request,{params}){
    const {userId}=await params;
    try{
         await  connectionDB()
       let users= await  User.findById(userId);
       if(!users){
        return NextResponse.json({message:"User not found"}, {status:404});
       }
      await User.deleteOne({_id:userId});
        return NextResponse.json({message:"User deleted successfully"}, {status:200});
    }
    catch(err){
        console.log("Error in deleting user by ID");
        console.log(err);
        return NextResponse.json({message:"Error in deleting user by ID"}, {status:500});
    }
}

export async function PUT(request,{params}){
try{
     await  connectionDB()
    const {userId}=await params;
    const {name, email, password, about, profileUrl}=await request.json();
    let user=await User.findById(userId);
    if(!user){
        return NextResponse.json({message:"User not found"}, {status:404});
    }
    user.name=name;
    user.email=email;
    user.password=password;
    user.about=about;
    user.profileUrl=profileUrl;
    await user.save();
    return NextResponse.json({message:"User updated successfully", user}, {status:200});
}
catch(err){
    console.log("Error in updating user by ID");
    console.log(err);
    return NextResponse.json({message:"Error in updating user by ID"}, {status:500});

}}