"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { UserContext } from '../context/userContext';
import { toast } from 'react-toastify';
import { logout } from '@/service/UserService';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logoutHandler = async () => {
    try {
      const res = await logout();
      setUser(undefined);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl">Tailblocks</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-gray-900">Home</Link>
            <Link href="/about" className="mr-5 hover:text-gray-900">About</Link>
            <Link href="/add-task" className="mr-5 hover:text-gray-900">add Task</Link>
            <Link href="/test" className="mr-5 hover:text-gray-900">test</Link>

          </nav>
         {user && 
      <>
         <div className='mr-5 text-gray-900'>{user.name}</div>
         <button onClick={logoutHandler} className="inline-flex items-center bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            logout
          </button>
      </>
         }

         {
          !user && (
          <>
           <Link href="/signup" className="inline-flex items-center bg-orange-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            signup
          </Link>
          <Link href="/signin" className="inline-flex items-center mx-2 bg-yellow-500 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            signin
          </Link>
          </>
        
          )
         }
        </div>
      </header>

    </div>
  )
}

export default Navbar