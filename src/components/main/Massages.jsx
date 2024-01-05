import React, { useEffect, useState, useRef } from 'react'
import Message from './Message'
import dataBaseService from '../../appwrite/database.js'
import authService from '../../appwrite/auth.js'

const Massages = () => {
    const [offset, setOffset] = useState(0)
    const [loader, setLoader] = useState(true)
    const [messages, setMessages] = useState([])
    const [userdata, setUserdata] = useState([])

    useEffect(() => {
        // console.log( messages.length);
        // if(messages.length == 25){
        //     setMessages([]);
        // }
        getMessages();
        userInfo();
    },[messages])

    const userInfo = async () => {
        const user = await authService.getCurrentUser();
        setUserdata(user);
    }
    

    const getMessages = async () => {

        let data = await dataBaseService.getMessages(offset);
        if(data.documents.length == 500){
            const ofset = offset + 500
            setOffset(ofset);
            data = data = await dataBaseService.getMessages(ofset)
        }
            setMessages(data.documents);
        // console.log(data.documents);
        setLoader(false)
    }



    return (
        !loader ?
            <div className='w-full h-4/5 overflow-scroll overflow-x-hidden'>
                {
                    messages.map((message) => {
                        // console.log(message);
                        if (message.userTo == 1){
                            if (message.userId === userdata.$id) {
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} owner />
                                    </div>
                                )
                            } else{
                                return (
                                    <div key={message.$id}>
                                        <Message message={message.message} />
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