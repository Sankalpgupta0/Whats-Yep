import React from "react";
import { useState } from "react";
import Avatar from "../Avatar";
import storageService from "../../appwrite/storage";
import { useEffect } from "react";
import dataBaseService from "../../appwrite/database";

const Message = ({message, userId="", owner=false, Time, imageUrl = ""}) => {

    const [userdata, setUserdata] = useState([])

    useEffect(() => {
        userInfo()
    },[])

    const userInfo = async() => {
        const users = await dataBaseService.getUser(userId);
        setUserdata(users)
    }

    return (
        <div className={`max-sm:w-3/4 w-2/3 m-3 flex box-content ${owner ? "flex-row-reverse ml-64 max-lg:ml-32 max-sm:ml-24 right-0" : ""}`}>
            <div>
                <Avatar  fallback={userdata.name}/>
                <p className="text-xs  text-slate-300">{Time}</p>
            </div>

            <div className={` px-8 py-3  rounded-br-lg rounded-bl-lg text-slate-200 ${owner ? "rounded-tl-lg mr-10 bg-green-800" : "rounded-tr-lg bg-slate-700"} ml-5`}>
                {imageUrl &&
                <img
                    src={storageService.getFilePreview(imageUrl)}
                    className={`rounded-lg w-1/3 max-sm:w-1/2 aspect-square mb-4`}
                />
                }
                <p className="">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Message;
