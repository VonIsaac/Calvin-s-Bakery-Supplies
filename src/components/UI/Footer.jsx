

import React from 'react'

export default function Footer({children}) {
  return (
    <div className='bg-slate-950'>
    <footer className="bg-white shadow dark:bg-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                {children}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Calvin's Bakery Supplies
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Facebook</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Instagram</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Gmail</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()} <a href="#" className="hover:underline">Calvin's Bakery Supplies™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  </div>
  )
}
