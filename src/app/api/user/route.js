import { connectionDB } from "@/lib/ConnectionDB";
import { User } from "@/model/Users";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function POST(request) {
    const { name, email, password, about, profileUrl } = await request.json();
  
    const user = new User({
        name,
        email,
        password:await bcrypt.hash(password, 10),
        about,
        profileUrl
    })
    try {
      await  connectionDB()
        const dbUser = await user.save();
        console.log(dbUser);
        return NextResponse.json(dbUser)
    }
    catch (err) {
        console.log("User creation failed");
        console.log(err);
        return NextResponse.json({ message: "User creation failed" }, { status: 500 });
    }


}

export async function GET(){
    let users=[]
    try{
         await  connectionDB()
        users=await User.find().select("-password");
        return NextResponse.json({message:"Users fetched successfully", users}, {status:200});
    }
    catch(err){
        console.log("Error in fetching users");
        console.log(err);
        return NextResponse.json({message:"Error in fetching users"}, {status:500});
    }
}