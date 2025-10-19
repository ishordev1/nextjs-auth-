import { connectionDB } from "@/lib/ConnectionDB";
import { Task } from "@/model/Task";
import { NextResponse } from "next/server";
connectionDB();
export async function GET(request,{params}){
    const {userId}=await params;
   
    let tasks=[]
    try{
         await  connectionDB()
        tasks=await Task.find({userId});
        
        return NextResponse.json({message:"Tasks fetched successfully", tasks}, {status:200});
    }
    catch(err){
        console.log("Error in fetching tasks");
        console.log(err);
        return NextResponse.json({message:"Error in fetching tasks"}, {status:500});
    }
}