"use client"

import { signin } from '@/service/UserService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/userContext'

const page = () => {

   const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
     const res=await signin(data);
  
  if(res.success){
    toast.success("signin successfully")
    router.push('/dashboard')
  }
  else{
    toast.error(res.message)
  }
    }
    catch(err){
      console.log(err);
      toast.error(err.response.data.message)
    }
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <form onSubmit={e=>handleSubmit(e)}>
          <div className="container px-5 py-3 mx-auto flex flex-wrap items-center">
          <div className=" w-auto mx-auto bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign in</h2>
          
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input type="password" id="password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
           
            <button  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
            <Link href='/signup' className="text-center text-xs text-gray-500 mt-3">signup page</Link>
          </div>
        </div>
        </form>
      </section>

    </>
  )
}

export default page