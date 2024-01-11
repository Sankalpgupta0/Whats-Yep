import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme)
return (
    <div className={`h-4/5 flex justify-center items-center ${!isDarktheme? "bgForChatsLight" : "bgForChatsDark"}`} >
        <h1 className={`max-sm:text-2xl max-lg:text-4xl text-5xl ${isDarktheme? "text-slate-200" : "text-slate-900"} `}>Welcome to the Home Page!</h1>
    </div>
)
}

export default Home