import React, { useEffect, useState } from 'react'
import {logout} from '../../store+slice/authSlice.js'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import authService from '../../appwrite/auth.js';


const Header = () => {

    const [userdata, setUserdata] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login')
    }

    useEffect(() => {
        userInfo()
    },[])

    const userInfo = async() => {
        const user = await authService.getCurrentUser();
        setUserdata(user);
    }


    return (
        <div className='max-sm:h-40 h-20 w-full bg-slate-900 flex justify-between items-center p-5'>
            <div>
                <p className=' text-white'>What's Yep👍</p>
            </div>
            <div className='flex '>
                <div className='mr-10 flex items-center'>
                    <img src="https://imgs.search.brave.com/KbAjSqAcd2-s7mAlmxWrEj-ge7W7F3xI7acc9aLJv8k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzIyLzcxLzI0/LzM2MF9GXzYyMjcx/MjQ0NF9VRjZEOTNw/aUVTNVc0dkJnbjBL/RndVeGVyZGFpdXpa/cC5qcGc" alt="" className='bg-yellow-500 h-10 w-10 rounded-full object-cover' />
                    <p className='text-white ml-2'>{userdata.name}</p>
                </div>
                <div>
                    <button
                        className='px-4 py-2 bg-slate-500 rounded-2xl text-white hover:bg-slate-700'
                        onClick={logoutHandler}
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header