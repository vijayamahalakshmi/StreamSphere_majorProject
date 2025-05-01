import React, { useState, useEffect } from 'react'
import './login.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Login = ({ setLoginModal }) => {
    const [loginField, setLoginField] = useState({ "userName": "", "password": "" })
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChange = (event, key) => {
        setLoginField({ ...loginField, [key]: event.target.value })
    }
    const handleLogin = async () => {
        setLoader(true)
        await axios.post('http://localhost:8000/auth/login', loginField,{ withCredentials: true}).then(response => {
            console.log(response)
            setLoginModal(false)
            setLoader(false)
            localStorage.setItem("login",true);
            localStorage.setItem("userInfo",JSON.stringify(response.data.user))
            localStorage.setItem("userId",response.data.user._id)
            localStorage.setItem("user",response.data.user.profilePic)
            window.location.reload();
        }).catch(err => {
            setLoader(false)
            toast.error("Invalid Credentials")
            
        })
    }





    return (
        <div className='login'>
            <div className="login_card">
                <div className="titleCard_login">
                    {/* <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' /> */}
                    Login
                </div>
                <div className="loginCredentials">
                    <div className="userNameLogin">
                        <input className='userNameLoginUserName' value={loginField.userName} onChange={(e) => { handleOnChange(e, 'userName') }} placeholder='UserName' type='text' />
                    </div>
                    <div className="userNameLogin">
                        <input className='userNameLoginUserName' value={loginField.password} onChange={(e) => { handleOnChange(e, 'password') }} placeholder='Password' type='password' />
                    </div>

                    <div className="login_buttons">
                        <div className="login-btn" onClick={handleLogin}>Login</div>
                        <Link to={'/signUp'} className="login-btn"  onClick={() => { setLoginModal(false) }}>SignUp</Link>
                        <div className="login-btn" onClick={() => { setLoginModal(false) }}>Cancel</div>


                    </div>
                    {
                        loader && <Box sx={{ display: 'flex' }}>
                            <CircularProgress color="success" />
                        </Box>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login