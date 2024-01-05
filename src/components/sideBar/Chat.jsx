import React from 'react'
import { useNavigate } from 'react-router-dom';

const Chat = ({userName, userId}) => {
    const navigate = useNavigate()
    return (
        <div
            className='max-lg:h-28 h-20 w-full hover:bg-slate-800 border-white border-b lg:flex items-center px-5'
            onClick={(e) => {
                navigate(`/users/${userId}`)
            }}
        >
            <div className='flex justify-center max-lg:mt-2'>
                <img src="https://imgs.search.brave.com/5W7AHsPaJKKEa0sldORzG7ojJejOJAF3VPAXZlgBOfg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ha25z/LWltYWdlcy5lb25s/aW5lLmNvbS9lb2xf/aW1hZ2VzL0VudGly/ZV9TaXRlLzIwMTc3/MTcvcnNfMTAyNHg2/ODItMTcwODE3MDU0/MzMwLTEwMjQudGhv/ci1yYWduYXJvay44/MTcxNy5qcGc_Zml0/PWFyb3VuZHw3NzY6/NTE3Jm91dHB1dC1x/dWFsaXR5PTkwJmNy/b3A9Nzc2OjUxNztj/ZW50ZXIsdG9w" alt="" className='bg-yellow-500 h-10 w-10 rounded-full object-cover' />
            </div>
            <div className='ml-5'>
                <h1 className='text-white text-xl'>{userName}</h1>
                <p className='text-slate-300 '>{userId}</p>
            </div>

        </div>

    )
};

export default Chat;