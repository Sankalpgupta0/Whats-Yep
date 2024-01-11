import React, { useState, useEffect } from 'react'
import dataBaseService from '../../appwrite/database.js'
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { useParams } from 'react-router-dom';
import { counter } from '../../store+slice/authSlice.js';
import { useSelector } from 'react-redux';
import { IoImagesSharp } from "react-icons/io5";
import storageService from '../../appwrite/storage.js';

const Input = () => {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();

    const [userdata, setUserdata] = useState([])

    const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme);


    useEffect(() => {
        userInfo()
    })

    const userInfo = async () => {
        const user = await authService.getCurrentUser();
        setUserdata(user);
    }

    const sendBtn = async () => {
        dispatch(counter())
        let status
        if(message.trim() == "" && image == "") {
            console.log("type sommething");
        } else {
            if (image != null) {
                const file = await storageService.uploadFile(image)
                if (file) {
                    const fileId = file.$id
                    if (id == undefined) {
                        status = await dataBaseService.createMessage(message, userdata.$id, "1", fileId);
                    } else {
                        status = await dataBaseService.createMessage(message, userdata.$id, id, fileId);
                    }
                } else {
                    if (id == undefined) {
                        status = await dataBaseService.createMessage(message, userdata.$id, "1", null);
                    } else {
                        status = await dataBaseService.createMessage(message, userdata.$id, id, null);
                    }
                }
            }
        }

        if (status) {
            console.log(status);
            setMessage("");
            setImage("")
        }
        else
            console.log("not done");
    }

    return (
        <div className={`h-20 w-full sticky bottom-0 ${!isDarktheme ? "bg-slate-200" : "bg-slate-900"} flex items-center px-5 `}
            onKeyDown={(e) => {
                if (e.key == 'Enter')
                    sendBtn();
            }}
        >
            <input
                type="text"
                placeholder='Type something'
                className={`bg-transparent outline-none text-xl w-3/4 h-full  ${!isDarktheme ? "text-black" : "text-white"} `}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className='flex items-center'>
                <img src="../../../src/images/attach.png" alt="" className='mx-1 cursor-pointer' />

                <input
                    type="file"
                    id='image'
                    className=' hidden'
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                        setImage(e.target.files[0])
                        
                    }}
                />
                <label htmlFor="image" onKeyDown={(e) => {
                    if (e.key == 'Enter'){
                        sendBtn();
                        dispatch(counter())
                    }
                }}>
                    <IoImagesSharp className='mx-1 cursor-pointer text-3xl text-slate-400' />
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