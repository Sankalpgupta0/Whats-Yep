import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authService from '../appwrite/auth';
import dataBaseService from '../appwrite/database';
import Message from './main/Message';

const User = () => {
    const [offset, setOffset] = useState(0)
    const {id} = useParams();
    const [loader, setLoader] = useState(true)
    let [messages, setMessages] = useState([]);

    const [CurrentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        getMessages();
        // userInfo();
        getCurrentUser();
    },[messages])

    const getCurrentUser = async () => {
        const CurrentUser = await authService.getCurrentUser();
        // console.log(CurrentUser);
        setCurrentUserId(CurrentUser.$id)
    }


    const getMessages = async () => {
        let data = await dataBaseService.getMessages(offset);
        if(data.documents.length == 500){
            const ofset = offset + 500
            setOffset(ofset);
            data = data = await dataBaseService.getMessages(ofset)
        }
        setMessages(data.documents);
        setLoader(false)
    }

    return (
        !loader?
        <div className='w-full h-4/5 overflow-scroll'>
            {
                messages.map((message) => {
                    if (message.userId === CurrentUserId && message.userTo == id) {
                        if(message.userId == CurrentUserId ){
                            return (
                                <div key={message.$id}>
                                    <Message message={message.message} owner/>
                                </div>
                            )
                        } else if (message.userTo == id) {
                            return (
                                <div key={message.$id}>
                                    <Message message={message.message}  />
                                </div>
                            )
                        }
                    } else if(message.userId === id && message.userTo == CurrentUserId){
                        if(message.userId == id){
                            return (
                                <div key={message.$id}>
                                    <Message message={message.message} />
                                </div>
                            )
                        } else if (message.userTo == CurrentUserId) {
                            return (
                                <div key={message.$id}>
                                    <Message message={message.message} owner />
                                </div>
                            )
                        }
                    }
                })
            }
        </div> : <div> Loading... </div>
    ) 
}

export default User