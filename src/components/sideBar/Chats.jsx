import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from './Chat.jsx';
import dataBaseService from '../../appwrite/database.js';
import authService from '../../appwrite/auth.js';
import Search from './Search.jsx';

const Chats = () => {
  const [CurrentUserId, setCurrentUserId] = useState("");
  const [users, setUsers] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    getCurrentUser();
  },[])

  const getCurrentUser = async () => {
    const CurrentUser = await authService.getCurrentUser();
    setCurrentUserId(CurrentUser.$id);
  }

  const getUsers = async () => {
    const usersInfo = await dataBaseService.getAllUsers()
    setUsers(usersInfo.documents);
  }

  return (
    <>
      <div
        className=' overflow-y-scroll h-20 w-full hover:bg-slate-900 border-white border-b flex items-center px-5'
        onClick={(e) => {
          navigate("/users/WorldChat")
        }}
      >
        <div>
          <img src='https://imgs.search.brave.com/KZpta3CE_ipWBsz_PI7oc0gAX7lgiDVBmeuVVJsoTDc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/MDU0NDM0OS9waG90/by9lYXJ0aC1kYXRh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1pVHJZS1VtTXMw/NldHeXBseVZOcDdl/cmhMR1NGRm4xbV9Q/enJIak4zUmpnPQ' alt="" className='bg-yellow-500 h-10 w-10 rounded-full object-cover' />
        </div>
        <div className='ml-5'>
          <h1 className='text-white text-xl'>World Chat 🌍</h1>
          <p className='text-slate-300'>Welcome</p>
        </div>

      </div>

      <div className='w-full h-8 border-b  border-white text-white'>
        Other Users ⤵️
      </div>

      <Search />
    </>
  )
}

export default Chats