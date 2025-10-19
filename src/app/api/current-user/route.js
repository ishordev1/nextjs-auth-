import { NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";
import { User } from "@/model/Users";
import { connectionDB } from "@/lib/ConnectionDB";
export async function GET(request){
    const authToken=request.cookies.get("authToken")?.value;
  const data=jsonwebtoken.verify(authToken,process.env.JWT_SECRET);
  connectionDB();
  const user=await User.findById(data._id).select("-password");
  return NextResponse.json({user});

}