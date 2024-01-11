import React, { useEffect, useState } from 'react'
import authService from '../../appwrite/auth.js';
import { Link } from 'react-router-dom';
import Logout from './Logout/Logout.jsx'
import dataBaseService from '../../appwrite/database.js';
import Avatar from '../Avatar.jsx';
import storageService from '../../appwrite/storage.js';
import { useSelector } from 'react-redux';

const Header = () => {

    const [userdata, setUserdata] = useState([])

    const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme);

    useEffect(() => {
        userInfo()
    },[])

    const userInfo = async() => {
        const users = await authService.getCurrentUser();
        if (users !== null) {
            const user = await dataBaseService.getUser(users.$id);
            setUserdata(user);
        }
    }


    return (
        <div className={`max-sm:h-40 h-20 w-full flex justify-between items-center p-5  ${!isDarktheme ? "bg-slate-200" : "bg-[#202C33]"}`}>
            <div>
                <Link to="/users">
                    <p className={` ${!isDarktheme ? "text-black" : "text-white"}`}>What's Yep👍</p>
                </Link>
            </div>
            <div className='flex '>
                <div className='mr-10 max-lg:mr-0 max-sm:mr-10 flex items-center'>
                    <Avatar image={storageService.getFilePreview(userdata.avatar)} fallback={userdata.name}/>
                    <p className={` ${!isDarktheme ? "text-black" : "text-white"} ml-2`}>{userdata.name}</p>
                </div>
                <div className=''>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default Header