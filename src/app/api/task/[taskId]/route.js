import { connectionDB } from "@/lib/ConnectionDB";
import { Task } from "@/model/Task";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
   await connectionDB()
    const { taskId } = await params;
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Task deleted successfully", deletedTask }, { status: 200 });
    }
    catch (err) {
        console.log("Error in deleting task");
        console.log(err);
        return NextResponse.json({ message: "Error in deleting task" }, { status: 500 });
    }
}
export async function PUT(request, { params }) {
    const { taskId } = await params;
    const { title, description, status } = await request.json();
    try {
          await connectionDB()
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
        if (!updatedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Task updated successfully", updatedTask }, { status: 200 });
    }
    catch (err) {
        console.log("Error in updating task");
        console.log(err);
        return NextResponse.json({ message: "Error in updating task" }, { status: 500 });
    }
}