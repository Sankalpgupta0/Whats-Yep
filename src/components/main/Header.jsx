import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  return (
    <div className='h-20 w-full bg-slate-800 px-10 justify-between flex items-center sticky top-0 z-10'>
        <div>
            <h1 className='text-xl text-white'>Chatting with {id ? id : "world"}</h1>
        </div>
        <div className='flex h-8 w-32 items-center text-white'>
            <img src='../../../src/images/cam.png' alt="cam" className='h-8 m-1 cursor-pointer max-lg:hidden'/>
            <img src="../../../src/images/add.png" alt="add" className='h-8 m-1 cursor-pointer max-lg:hidden'/>
            <img src="../../../src/images/more.png" alt="more" className='h-8 m-1 cursor-pointer max-lg:hidden'/>
            <button
            onClick={() => {
              navigate("/Chats");
              window.location.reload();
            }}
            >
              <img src="../../../src/images/bars.png" alt="Chats" className='h-8 m-1 cursor-pointer sm:hidden'/>
            </button>
        </div>
    </div>
  )
}

export default Header