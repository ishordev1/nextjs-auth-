"use client"

import axios from 'axios'
import { useState } from 'react'
import { createTask } from '../../service/TaskService'
import { toast } from 'react-toastify'

const addTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "pending",
        userId: "68dfe27aff001d154af31d4c"
    })

const resetData=()=>{
    setTask({
        title:'',
        description:'',
        status:'pending'
    })
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createTask(task);
            toast.success("Task added successfully")
            resetData()
            console.log(data);
        } catch (err) {
            toast.error("Error in adding task")
            console.log(err);

        }

    }

    return (
        <>
            {/* {JSON.stringify(task)} */}
            <div className="container mx-auto">
                <div>
                    <h1 className="text-3xl text-center mt-3">Add Task</h1>
                </div>
                <form onSubmit={e => handleSubmit(e)} >
                    <div className="grid grid-cols-12 ">
                        <div className="col-span-6 col-start-4 bg-gray-100 p-5 rounded-lg mt-5">
                            <div className="relative mb-4">
                                <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Title</label>
                                <input onChange={(e) => setTask({ ...task, title: e.target.value })} type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Description</label>
                                <input onChange={(e) => setTask({ ...task, description: e.target.value })} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">status</label>
                                <select onChange={(e) => setTask({ ...task, status: e.target.value })} id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                    <option  disabled>select status</option>
                                    <option value="pending">pending</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        </div>
                    </div>

                </form>
            </div>

        </>
    )
}

export default addTask