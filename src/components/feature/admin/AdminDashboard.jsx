import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import SideBar from '../../UI/SideBar'

export default function AdminDashboard() {
 
  return (
   <>
    <main className=' bg-stone-900 h-screen '>
        <div >
          <SideBar />
        </div>
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-6xl text-center text-gray-300 font-bold mb-3.5'>Admin Dashboard</h1>
            <div className='flex justify-center items-center'>
                <h2 className='text-2xl text-blue-300'>Welcome to the Admin Dashboard</h2>
            </div>
        </div>
    </main>
   </>
  )
}
