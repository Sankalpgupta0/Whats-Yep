import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const NotFount = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/users")
    })
    return (
        <div>NotFount</div>
    )
}

export default NotFount