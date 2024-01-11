import React, { useEffect, useState, useRef } from 'react'
import Message from './Message'
import dataBaseService from '../../appwrite/database.js'
import authService from '../../appwrite/auth.js'
import { useSelector } from 'react-redux'

const Massages = () => {
    const [offset, setOffset] = useState(0)
    const [loader, setLoader] = useState(true)
    const [messages, setMessages] = useState([])
    const [userdata, setUserdata] = useState([])
    const [count, setCount] = useState(0);

    const counts = useSelector((state) => state.AuthReducer.count)
    const isDarktheme = useSelector((state) => state.ThemeReducer.isDarktheme)
    
    useEffect(() => {
        // setCount(counts);
        getMessages();
        userInfo();

    })

    const userInfo = async () => {
        const user = await authService.getCurrentUser();
        setUserdata(user);
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
        !loader ?
            <div className={` relative w-full h-4/5 overflow-scroll overflow-x-hidden ${!isDarktheme? "bgForChatsLight" : "bgForChatsDark"}`}>
                {
                    messages.map((message) => {
                        if (message.userTo == 1){
                            if (message.userId === userdata.$id) {
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} userId={message.userId}  owner imageUrl={message.image}/>
                                    </div>
                                )
                            } else{
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} userId={message.userId} imageUrl={message.image}/>
                                    </div>
                                )
                            }

                        }
                    })
                }
            </div>: <div> Loading... </div>
    )
}

export default Massages