import React from 'react'
import Header from './Header.jsx'
import Input from './Input.jsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='max-sm:w-full w-2/3 h-full bg-slate-500 relative overflow-y-scroll overflow-x-hidden'>
      <Header />
      <Outlet />
      <Input />
    </div>
  )
}

export default MainLayout