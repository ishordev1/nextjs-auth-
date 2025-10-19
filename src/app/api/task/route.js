
import { connectionDB } from "@/lib/ConnectionDB";
import { Task } from "@/model/Task";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";

export async function POST(request){ 
    const { title, description, status,userId} = await request.json();

    const task = new Task({
        title,
        description,
        status,
        userId
    })
    try {
         await  connectionDB()
        let user=await User.findById(userId);
        if(!user){
            return NextResponse.json({message:"User not found"}, {status:404});
        }
        const dbTask = await task.save();
        console.log(dbTask);
        return NextResponse.json(dbTask)
    }
    catch (err) {
        console.log("Task creation failed");
        console.log(err);
        return NextResponse.json({ message: "Task creation failed" }, { status: 500 });
    }


}

export async function GET(){
    let tasks=[]
    try{
         await  connectionDB()
        tasks=await Task.find();
        return NextResponse.json({message:"Tasks fetched successfully", tasks}, {status:200});
    }
    catch(err){
        console.log("Error in fetching tasks");
        console.log(err);
        return NextResponse.json({message:"Error in fetching tasks"}, {status:500});
    }
}