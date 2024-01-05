import React, { useEffect } from 'react'
import Header from './Header'
import Search from './Search'
import Chats from './Chats'

const SideBarLayout = () => {
  
  return (
    <div className='h-full w-full bg-slate-700 overflow-y-scroll'>
      <Header />
      <Search />
      <Chats />
    </div>
  )
}

export default SideBarLayout