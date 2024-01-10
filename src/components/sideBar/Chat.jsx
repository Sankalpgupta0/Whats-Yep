import React from 'react'
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

const Chat = ({Name, userName, userId, profilePic}) => {
    const navigate = useNavigate()
    return (
        <div
            className='max-lg:h-28 h-20 w-full hover:bg-slate-800 border-white border-b lg:flex items-center px-5'
            onClick={(e) => {
                navigate(`/users/${userId}`)
                window.location.reload();
            }}
        >
            <div className='flex justify-center max-lg:mt-2'>
                <Avatar image={profilePic} fallback={Name}/>
            </div>
            <div className='ml-5'>
                <h1 className='text-white text-xl max-sm:text-center'>{Name}</h1>
                <p className='text-slate-300 max-sm:text-center'>{userName}</p>
            </div>

        </div>

    )
};

export default Chat;