import React, { useState } from 'react'

const Search = () => {
    const [search,setSearch] = useState('')

return (
    <div className='w-full h-8 border-b  border-white '>
        <input 
        type="text" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-transparent h-full w-full px-3 text-white outline-none placeholder:text-white '  
        placeholder='🔎  Find a user'
        />
    </div>
)
}

export default Search