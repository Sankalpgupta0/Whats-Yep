import React, { useEffect, useState } from 'react'
import dataBaseService from '../../appwrite/database'
import authService from '../../appwrite/auth'
import Chat from './Chat'

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [CurrentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        getUsers();
        getCurrentUser();
    }, [])
    useEffect(() => {
        Search();
    }, [search])

    const Search = () => {
        const filteredResults = users.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults);
    }

    const getCurrentUser = async () => {
        const CurrentUser = await authService.getCurrentUser();
        setCurrentUserId(CurrentUser.$id);
    }

    const getUsers = async () => {
        const users = await dataBaseService.getAllUsers();
        setUsers(users.documents);
    }

    return (
        <>

            <div className='w-full h-8 border-b  border-white '>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='bg-transparent h-full w-full px-3 text-white outline-none placeholder:text-white '
                    placeholder='🔎  Find a user'

                />
                {
                    search.length == 0 ?
                    users.map((user) => {
                        if (user.ID !== CurrentUserId) {
                            return (
                                <div key={user.ID}>
                                    <Chat Name={user.name} userName={user.username} userId={user.ID} profilePic={user.avatar} />
                                </div>
                            )
                        }
                    }) : searchResults.map((result) => {
                        if (result.ID !== CurrentUserId) {
                            return (
                                <div key={result.ID}>
                                    <Chat Name={result.name} userName={result.username} userId={result.ID} profilePic={result.avatar} />
                                </div>
                            )
                        }
                    })
                }
                
            </div>
        </>
    )
}

export default Search