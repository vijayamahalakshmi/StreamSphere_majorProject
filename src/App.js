// import logo from './logo.svg';
// import './App.css';
// import Home from './Screen/Home/home';
// import Navbar from './Component/Navbar/navbar';
// import { useState,useEffect } from 'react';
// import { Route,Routes } from 'react-router-dom';
// import Video from './Screen/Video/video';
// import Profile from './Screen/Profile/profile';
// import SignUp from './Screen/SignUp/signUp';
// import VideoUpload from './Component/VideoUpload/videoUpload';

// import axios from 'axios';



// function App() {
//   const [sideNavbar,setSideNavbar] = useState(true);
//   // useEffect(()=>{
//   //   axios.get('http://localhost:8000/api/allVideo').then(res=>{
//   //     console.log(res);
//   //   }).catch(err=>{
//   //     console.log(err)
//   //   })
//   // },[])
//   const setSideNavbarFunc=(value)=>{
//     setSideNavbar(value);
//   }
//   return (
//     <div className="App">
//       <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
//       <Routes>
//         <Route path='/' element={<Home sideNavbar={sideNavbar}/>} />
//         <Route path='/watch/:id' element={<Video />} />
//         <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />}/>
//         <Route path='/signUp' element={<SignUp />} />
//         <Route path='/:id/upload' element={<VideoUpload />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;

import './App.css';
import Home from './Screen/Home/home';
import Navbar from './Component/Navbar/navbar';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Video from './Screen/Video/video';
import Profile from './Screen/Profile/profile';
import SignUp from './Screen/SignUp/signUp';
import VideoUpload from './Component/VideoUpload/videoUpload';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Navbar
        setSideNavbarFunc={setSideNavbarFunc}
        sideNavbar={sideNavbar}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/:id/upload' element={<VideoUpload />} />
       

      </Routes>
    </div>
  );
}

export default App;
