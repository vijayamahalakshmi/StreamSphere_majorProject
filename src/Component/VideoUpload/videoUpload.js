import React, { useState, useEffect } from 'react';
import './videoUpload.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoUpload = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [videoInput, setVideoInput] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: ""
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const uploadImage = async (e, type) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'streamSphere'); // Replace with your preset

    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dv93hblnq/${type === "thumbnail" ? 'image' : 'video'}/upload`,
        data
      );
      setVideoInput({ ...videoInput, [type]: res.data.secure_url });
      setUploadedImageUrl(res.data.secure_url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("login") === "true";
  
    if (!isLoggedIn) {
      toast.error("⚠️ Please login to upload videos.");
      setTimeout(() => {
        navigate('/');
      }, 20000); // Delay navigation so toast is visible
    }
  }, []);
  

  const handleOnchange = (event, key) => {
    setVideoInput({ ...videoInput, [key]: event.target.value });
  };

  const handleUpload = async () => {
    const isLoggedIn = localStorage.getItem("login") === "true";

    if (!isLoggedIn) {
      toast.error("⚠️ Please login before uploading videos.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/video", videoInput, {
        withCredentials: true
      });
      setLoading(false);
      toast.success("✅ Video uploaded successfully!");
      navigate('/');
    } catch (err) {
      setLoading(false);
      toast.error("❌ Upload failed. Try again.");
      console.log(err);
    }
  };

  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          Upload Video
        </div>
        <div className="uploadForm">
          <input type='text' value={videoInput.title} onChange={(e) => handleOnchange(e, "title")} placeholder='Title of Video' className='uploadFormInputs' />
          <input type='text' value={videoInput.description} onChange={(e) => handleOnchange(e, "description")} placeholder='Description' className='uploadFormInputs' />
          <input type='text' value={videoInput.videoType} onChange={(e) => handleOnchange(e, "videoType")} placeholder='Category' className='uploadFormInputs' />
          <div>Thumbnail <input type='file' accept="image/*" onChange={(e) => uploadImage(e, "thumbnail")} /></div>
          <div>Video <input type='file' accept="video/mp4, video/webm, video/*" onChange={(e) => uploadImage(e, "videoLink")} /></div>
        </div>
        <div className="uploadBtns">
          <div className="uploadBtn-form" onClick={handleUpload}>
            {loading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress color="success" size={"22px"} />
              </Box>
            ) : "Upload"}
          </div>
          <Link to={'/'} className="uploadBtn-form">
            Home
          </Link>
        </div>
      </div>

      {/* ✅ Toast container on top center */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default VideoUpload;
