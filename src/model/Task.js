const { mongoose } = require("mongoose");

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","in-progress","completed"],
        default:"pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
});

export const Task=mongoose.models.Task || mongoose.model("Task",taskSchema);

