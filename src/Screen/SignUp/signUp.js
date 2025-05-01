import React, { useState } from 'react'
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link,useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('https://th.bing.com/th/id/R.8464f4caaaadc75da0d6c8156a56f343?rik=VO2dxuhLtI8x4Q&riu=http%3a%2f%2fclipart-library.com%2fnewimages%2fperson-clipart-25.jpg&ehk=aX2TvBau%2f8VoEtUgBuxxxUWr%2bY3bef1vqFWjBX3AXkc%3d&risl=&pid=ImgRaw&r=0');
    const navigate = useNavigate();
    const [loginInputs,setLoginInputs] = useState({"channelName":"","userName":"","password":"","about":"","profilePic":uploadedImageUrl});
    const [loading, setLoading] = useState(false);
    
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'streamSphere'); // Replace 'your_upload_preset' with your actual upload preset

        setLoading(true);

        try {
            const res = await axios.post(
                'https://api.cloudinary.com/v1_1/dv93hblnq/image/upload', // Replace 'your_cloud_name' with your actual cloud name
                data
            );
            setUploadedImageUrl(res.data.secure_url);
            setLoginInputs({...loginInputs,"profilePic":res.data.secure_url});
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOnChange=(event,key)=>{
        setLoginInputs({...loginInputs,[key]:event.target.value})
    }

    const onSignUp =async()=>{
        await axios.post('http://localhost:8000/auth/signUp',loginInputs).then((res)=>{
            console.log(res);
            navigate('/');
            toast.success("User Created SuccessFully")
        }).catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
    }
    return (
        <div className='signUp'>
            <div className="signup_card">
                <div className="signUp_title">
                    {/* <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' /> */}
                    SignUp
                </div>
                <div className="signUp_Inputs">
                    <input type='text' className='signUp_Inputs_inp' value={loginInputs.channelName} onChange={(e)=>{handleOnChange(e,'channelName')}} placeholder='Channel Name' />
                    <input type='text' className='signUp_Inputs_inp' value={loginInputs.userName} onChange={(e)=>{handleOnChange(e,'userName')}} placeholder='User Name' />
                    <input type='password' className='signUp_Inputs_inp' value={loginInputs.password} onChange={(e)=>{handleOnChange(e,'password')}} placeholder='Password' />
                    <input type='text' className='signUp_Inputs_inp' value={loginInputs.about} onChange={(e)=>{handleOnChange(e,'about')}} placeholder='About Your Channel' />
                    <div className="image_upload_signup">
                        <input type='file' onChange={uploadImage}/>
                        <div className='image_upload_signup_div'>
                            <img className='image_default_signUp' src={uploadedImageUrl} />
                        </div>
                    </div>
                    {
                        loading && <Box sx={{ display: 'flex' }}>
                        <CircularProgress color="success" />
                    </Box>
                    }
                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={onSignUp}>SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>

                    </div>

                </div>
            </div>
            <ToastContainer/>

        </div>
    )
}

export default SignUp