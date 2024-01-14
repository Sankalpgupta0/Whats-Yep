import React, { useState } from 'react'
import Header from './Header'
import Search from './Search'
import Chats from './Chats'
import { useSelector } from 'react-redux'

const SideBarLayout = () => {
  const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme);
  const [displaySearchResult, setDisplaySearchResult] = useState(false)
  
  return (
    <div className={`h-full w-full ${isDarktheme ? "bg-[#111B21]" : "bg-gray-700  " } overflow-y-scroll`}>
      <Header />
      <div className={`${displaySearchResult ? "hidden" : ""}`}>
        <Chats />
      </div>
    </div>
  )
}

export default SideBarLayout