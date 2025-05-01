import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import MicSharpIcon from '@mui/icons-material/MicSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Link, useNavigate } from 'react-router-dom';
import LogoImg from '../../Assets/newLogo.jpg';
import Login from '../Login/login';
import axios from 'axios';

const Navbar = ({ setSideNavbarFunc, sideNavbar, isDarkMode, toggleTheme }) => {
  const [navbarModal, setNavbarModal] = useState(false);
  const [login, setLogin] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const [userPic, setUserPic] = useState('https://th.bing.com/th/id/OIP.hA04LwcrDABDbCzqGof8iQHaHa?rs=1&pid=ImgDetMain');
  const modalRef = useRef();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]); // clear suggestions
    }
  };

  const handleSearchInput = (value) => {
    setSearchQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.trim() !== '') {
        axios.get(`http://localhost:8000/video/search?q=${value}`)
          .then(res => {
            setSuggestions(res.data.videos);
          })
          .catch(err => console.log(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleHambergerClick = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const handleClickModal = () => {
    setNavbarModal(!navbarModal);
  };

  const setLoginModal = (val) => {
    setLogin(val);
  };

  const conclickOfPopUpOption = (button) => {
    setNavbarModal(false);
    if (button === 'Profile') {
      let id = localStorage.getItem('userId');
      navigate(`/user/${id}`);
    } else if (button === 'Logout') {
      localStorage.clear();
      getLogOut();
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
    } else {
      setLogin(true);
    }
  };

  const getLogOut = async () => {
    await axios
      .post('http://localhost:8000/auth/logout', {}, { withCredentials: true })
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let userPic = localStorage.getItem('user');
    setIsLogin(localStorage.getItem('login') !== null ? localStorage.getItem('login') : false);
    if (userPic !== null) {
      setUserPic(userPic);
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setNavbarModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarModal]);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={handleHambergerClick}>
          <MenuIcon />
        </div>
        <Link to={'/'} className="navbar_youtubeImg">
          <img src={LogoImg} className="navbar_logo_new" />
          <p style={{ paddingLeft: 30, fontSize: 22 }}>Stream Sphere</p>
        </Link>
      </div>

      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input
            placeholder="Search"
            type="text"
            className="navbar_searchBoxInput"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <div className="navbar_searchIconBox" onClick={handleSearch}>
            <SearchSharpIcon sx={{ fontSize: '28px' }} />
          </div>

          {/* Live Search Dropdown */}
          {suggestions.length > 0 && (
            <div className="liveSearchDropdown">
              {suggestions.map((video) => (
                <Link
                  to={`/watch/${video._id}`}
                  className="searchSuggestionItem"
                  key={video._id}
                  onClick={() => setSuggestions([])}
                >
                  <img src={video.thumbnail} alt={video.title} />
                  <div>
                    <strong>{video.title}</strong>
                    <p>{video.user.channelName}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="navbar_mike">
          <MicSharpIcon />
        </div>
      </div>

      <div className="navbar-right">
        <Link to={`/${localStorage.getItem('userId')}/upload`}>
          <VideoCallOutlinedIcon sx={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} />
        </Link>

        <NotificationsNoneSharpIcon sx={{ fontSize: '30px', cursor: 'pointer' }} />

        <button onClick={toggleTheme} className="navbar-theme-icon">
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <img onClick={handleClickModal} className="navbar-right-logo" src={userPic} alt="Logo" />

        {navbarModal && (
          <div className="navbar-modal" ref={modalRef}>
            {islogin && (
              <div className="navbar-modal-option" onClick={() => conclickOfPopUpOption('Profile')}>
                Profile
              </div>
            )}
            {islogin && (
              <div className="navbar-modal-option" onClick={() => conclickOfPopUpOption('Logout')}>
                Logout
              </div>
            )}
            {!islogin && (
              <div className="navbar-modal-option" onClick={() => conclickOfPopUpOption('Login')}>
                Login
              </div>
            )}
          </div>
        )}
      </div>

      {login && <Login setLoginModal={setLoginModal} />}
    </div>
  );
};

export default Navbar;
