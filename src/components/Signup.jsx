import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store+slice/authSlice.js";
import dataBaseService from "../appwrite/database.js";
import storageService from "../appwrite/storage.js";
import { RxAvatar } from "react-icons/rx";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [validName, setValidName] = useState(false)
    const [image, setImage] = useState(null);

    const signupbtn = async (e) => {
        let user;
        if (name.trim() === "" || email.trim() == "" || password.trim() == "" || username.trim() == "") {
            return alert("Enter All Credential");
        } else {
            if (image != null) {
                const file = await storageService.uploadFile(image);
                if (file) {
                    const fileId = file.$id;
                    user = await authService.createAccount({ email, password, name });
                    if (user) {
                        const userData = await authService.getCurrentUser();
                        await dataBaseService.createUserDatabase(user.userId, name, password, username, fileId)
                        if (userData) {
                            dispatch(login(userData));
                        }
                        navigate("/users");
                    }
                }
            } else {
                user = await authService.createAccount({ email, password, name });
                if (user) {
                    const userData = await authService.getCurrentUser();
                    await dataBaseService.createUserDatabase(user.userId, name, password, username, null)
                    if (userData) {
                        dispatch(login(userData));
                    }
                    navigate("/users");
                }
            }
            // TODO: add avatar feature
        }

    };
    // TODO: username
    useEffect(() => {
        SelectUserName();
    })

    const SelectUserName = async () => {
        try {
            const users = await dataBaseService.getAllUsers();

            (users.documents).map((user) => {
                if ((username).toLowerCase() == (user.username).toLowerCase()) {
                    setValidName(false)
                } else {
                    setValidName(true)
                }
            })
        } catch (error) {
            console.log("Error in SelectUserName :: " + error);
        }
    }


    return (
        <div 
        className="h-screen w-screen flex justify-center items-center"
        onKeyDown={(e) => {
            if(e.key == 'Enter')
            signupbtn();
        }}
        >
            <div 
            className="sm:w-1/2 bg-slate-100 px-10 rounded-xl w-full"
            
            >
                <div className="mx-auto ">
                    <h1 className="text-xl font-bold text-center shadow-lg">
                        Sign up to create account
                    </h1>
                    <p className="text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
                <div className="mx-auto my-5">
                    <input
                        type="text"
                        lable="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full Name :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

                    <input
                        type="text"
                        lable="username"
                        value={username}
                        onChange={(e) => setUsername((e.target.value).toLowerCase().replace(/ /g, '-'))}
                        placeholder="Enter your username :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

                    {
                        username.length != 0 ? (
                            validName ? <p className="text-green-500 text-center">
                                Username is valid
                            </p> : <p className="text-red-500 text-center">
                                username is taken
                            </p>
                        )
                            : null
                    }

                    <input
                        type="email"
                        lable="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

                    <input
                        type="password"
                        lable="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password :"
                        className="h-12 w-full px-5 rounded-md my-1"
                    />

                    <label
                        className=" text-[15px] text-violet11 flex justify-center  items-center cursor-pointer" htmlFor="uploadImage"
                    >
                        <img src="../../../src/images/addAvatar.png" alt="" className='h-10 ' />
                        <h1>Add Avatar</h1>
                    </label>
                    <input
                        className="hidden"
                        id="uploadImage"
                        placeholder='uploadImage'
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button
                        className="bg-blue-600 w-full my-3 py-2 rounded-lg text-white text-center hover:bg-blue-800"
                        disabled={!validName}
                        onClick={signupbtn}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
