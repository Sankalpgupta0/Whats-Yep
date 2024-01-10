import React, { useState,useEffect } from 'react'
import dataBaseService from '../../appwrite/database.js'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { useParams } from 'react-router-dom';
import { counter } from '../../store+slice/authSlice.js';

const Input = () => {
    const [message,setMessage] = useState('');
    const dispatch = useDispatch();
    const {id} = useParams();

    const [userdata, setUserdata] = useState([])

    useEffect(() => {
        userInfo()
    })

    const userInfo = async() => {
        const user = await authService.getCurrentUser();
        setUserdata(user);
    }

    const sendBtn = async() => {
        dispatch(counter())
        let status
        if(message.trim() == ""){
            console.log("type something");
        } else {
            if(id == undefined){
                status = await dataBaseService.createMessage(message, userdata.$id, "1");
            } else {
                status = await dataBaseService.createMessage(message, userdata.$id, id);
            }
    
            if(status){
                console.log(status);
                setMessage("")
            }
            else
                console.log("not done");
        }
    }

return (
    <div className='h-20 w-full sticky bottom-0 bg-slate-200 flex items-center px-5' 
    onKeyDown={(e) => {
        if(e.key == 'Enter')
            sendBtn();
    }}
    >
        <input 
        type="text" 
        placeholder='Type something' 
        className='bg-transparent outline-none text-xl w-3/4 h-full'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <div className='flex items-center'>
            <img src="../../../src/images/attach.png" alt="" className='mx-1 cursor-pointer'/>

            <input type="file" id='image' className=' hidden'/>
            <label htmlFor="image">
                <img src="../../../src/images/img.png" alt="" className='mx-1 cursor-pointer'/>
            </label>
            <button className='px-4 py-2 bg-slate-500 rounded-2xl text-white hover:bg-slate-700 mx-1'
            onClick={sendBtn}
            >
                Send
            </button>
        </div>
        
    </div>
)
}

export default Input