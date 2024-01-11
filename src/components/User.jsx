import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authService from '../appwrite/auth';
import dataBaseService from '../appwrite/database';
import Message from './main/Message';
import { useSelector } from 'react-redux';

const User = () => {
    const [offset, setOffset] = useState(0)
    const {id} = useParams();
    const [loader, setLoader] = useState(true)
    let [messages, setMessages] = useState([]);
    const [count, setCount] = useState(0);

    const counts = useSelector((state) => state.AuthReducer.count)

    const [CurrentUserId, setCurrentUserId] = useState("");

    const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme)

    useEffect(() => {
        setCount(counts)
        getMessages();
        getCurrentUser();
    },[counts, count])

    const getCurrentUser = async () => {
        const CurrentUser = await authService.getCurrentUser();
        setCurrentUserId(CurrentUser.$id)
    }


    const getMessages = async () => {
        let data = await dataBaseService.getMessages(offset);
        if(data.documents.length == 5000){
            const ofset = offset + 5000
            setOffset(ofset);
            data = data = await dataBaseService.getMessages(ofset)
        }
        setMessages(data.documents);
        setLoader(false)
    }

    return (
        !loader?
        <div className={`w-full h-4/5 overflow-scroll ${!isDarktheme? "bgForChatsLight" : "bgForChatsDark"}`}>
            {
                messages.map((message) => {
                    if((message.message).trim() != ""){
                        if (message.userId === CurrentUserId && message.userTo == id) {
                            if(message.userId == CurrentUserId ){
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} userId={message.userId} owner imageUrl={message.image}/>
                                    </div>
                                )
                            } else if (message.userTo == id) {
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} userId={message.userId} imageUrl={message.image} />
                                    </div>
                                )
                            }
                        } else if(message.userId === id && message.userTo == CurrentUserId){
                            if(message.userId == id){
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} userId={message.userId} imageUrl={message.image}/>
                                    </div>
                                )
                            } else if (message.userTo == CurrentUserId) {
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} owner userId={message.userId} imageUrl={message.image}/>
                                    </div>
                                )
                            }
                        }
                    }
                })
            }
        </div> : <div> Loading... </div>
    ) 
}

export default User