import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import dataBaseService from '../../appwrite/database';
import { MdDarkMode } from "react-icons/md";
import { useSelector } from 'react-redux';
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../store+slice/theme';
import { IoVideocamOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { BsChatSquareDotsFill } from "react-icons/bs";
import Avatar from '../Avatar';
import storageService from '../../appwrite/storage';

const Header = () => {
  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {id} = useParams();

  const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme);


  useEffect(() => {
    getUsername();
  })

  const getUsername = async() => {
    if(id){
      const user = await dataBaseService.getUser(id);
      setUsername(user.name);
      setAvatar(user.avatar)
    }
  }
  

  return (
    <div className='h-20 w-full bg-slate-800 px-10 justify-between flex items-center sticky top-0 z-10'>
        <div>
            <h1 className='text-xl text-white w-full max-sm:text-sm flex items-center'>
              <Avatar image={storageService.getFilePreview(avatar)}/>
              Chatting with {username ? username : "world"}</h1>
        </div>
        <div className='flex h-8 w-32 items-center text-white mr-36'>
            < IoVideocamOutline className="text-5xl cursor-pointer max-sm:hidden " />
            < IoIosMore className="text-3xl mx-5 cursor-pointer max-sm:hidden " />
            <button
            onClick={() => {
              navigate("/Chats");
              // window.location.reload();
            }}
            >
              < BsChatSquareDotsFill className='text-3xl m-1 cursor-pointer sm:hidden absolute right-36 bottom-5 max-sm:right-16'/>
            </button>

            <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleTheme());
            }}
            className='ml-5 text-3xl absolute right-5'
            >
              {
                isDarktheme? <MdDarkMode /> : <MdOutlineDarkMode />
              }
            </button>
        </div>
    </div>
  )
}

export default Header