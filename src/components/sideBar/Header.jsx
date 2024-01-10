import React, { useEffect, useState } from 'react'
import authService from '../../appwrite/auth.js';
import { Link } from 'react-router-dom';
import Logout from './Logout/Logout.jsx'
import dataBaseService from '../../appwrite/database.js';
import Avatar from '../Avatar.jsx';
import storageService from '../../appwrite/storage.js';

const Header = () => {

    const [userdata, setUserdata] = useState([])

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
        <div className='max-sm:h-40 h-20 w-full bg-slate-900 flex justify-between items-center p-5'>
            <div>
                <Link to="/users">
                    <p className=' text-white'>What's Yep👍</p>
                </Link>
            </div>
            <div className='flex '>
                <div className='mr-10 flex items-center'>
                    <Avatar image={storageService.getFilePreview(userdata.avatar)} fallback={userdata.name}/>
                    <p className='text-white ml-2'>{userdata.name}</p>
                </div>
                <div>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export default Header