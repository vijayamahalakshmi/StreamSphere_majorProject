import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import VideoCallSharpIcon from '@mui/icons-material/VideoCallSharp';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import './sideNavbar.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
const SideNavbar = ({ sideNavbar }) => {
    const [subscriberModal, setSubscriberModal] = useState(false)
    const [activeLinik, setActiveLink] = useState("Home");
    const [listSubs, setListSubs] = useState([])
    let userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

    const handleSubscription = () => {
        setActiveLink("Subscription");
        setSubscriberModal(true)
    }

    const fetchSubscriber = async () => {
        await axios.get('http://localhost:8000/auth/getAllSubscription', { withCredentials: true }).then((resp) => {
            setListSubs(resp.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (subscriberModal) {
            fetchSubscriber()
        }
    }, [subscriberModal])
    return (
        <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"} >
            <div className="home_sideNavbarTop">
                <Link to={'/'} className={`home_sideNavbarTopOption ${activeLinik === "Home" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Home")}>
                    <HomeIcon />
                    <div className="home_sideNavbarTopOptionTitle" >Home</div>
                </Link>

                <div className={`home_sideNavbarTopOption ${activeLinik === "Subscription" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => handleSubscription()}>
                    <SubscriptionsIcon />
                    <div className="home_sideNavbarTopOptionTitle">Subscription</div>
                </div>

            </div>
            {
                userInfo ? <div className="home_sideNavbarMiddle">
                    <div className="home_sideNavbarTopOption">
                        <div className="home_sideNavbarTopOptionTitle">You</div>
                        <ArrowForwardIosSharpIcon sx={{ fontSize: "16px" }} />

                    </div>
                    {
                        userInfo && <Link to={`/user/${userInfo._id}`} className={`home_sideNavbarTopOption ${activeLinik === "Your channel" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Your channel")}>
                            <RecentActorsIcon />
                            <div className="home_sideNavbarTopOptionTitle">Your channel</div>
                        </Link>
                    }
                    {/* <div className={`home_sideNavbarTopOption ${activeLinik === "History" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("History")}>
                    <HistoryIcon />
                    <div className="home_sideNavbarTopOptionTitle">History</div>
                </div> */}
                    {/* <div className={`home_sideNavbarTopOption ${activeLinik === "Playlists" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Playlists")}>
                    <PlaylistPlayIcon />
                    <div className="home_sideNavbarTopOptionTitle">Playlists</div>
                </div> */}
                    {
                        userInfo && <Link to={`/user/${userInfo._id}`} className={`home_sideNavbarTopOption ${activeLinik === "Your Videos" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Your Videos")}>
                            <SmartDisplayOutlinedIcon />
                            <div className="home_sideNavbarTopOptionTitle">Your videos</div>
                        </Link>
                    }
                    {/* <div className={`home_sideNavbarTopOption ${activeLinik === "Watch later" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Watch Later")}>
                    <WatchLaterOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Watch later</div>
                </div> */}

                    {/* <div className={`home_sideNavbarTopOption ${activeLinik === "Liked videos" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Liked videos")}>
                    <ThumbUpAltOutlinedIcon />
                    <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
                </div> */}
                    {/* <Link to={`/user/${userInfo._id}`} className={`home_sideNavbarTopOption ${activeLinik === "Your clips" ? "home_sideNavbarTopOption_active" : null}`} onClick={() => setActiveLink("Your Clips")}>
                        <ContentCutIcon />
                        <div className="home_sideNavbarTopOptionTitle">Your clips</div>
                    </Link> */}

                </div> : null
            }
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Topics</div>

                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Front End</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Back End</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Scientific</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Artificial Intelligence</div>
                </div>
                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Scientific Content</div>
                </div>

            </div>

            {
                subscriberModal && <div className='modal-subscriber'>
                    <div className='subscriber-card'>
                        <div style={{ cursor: "pointer" }} onClick={() => setSubscriberModal(false)}><CloseIcon /></div>

                        <h2>Subsciptions</h2>
                        {
                            listSubs.length === 0 ? "No Subscription Yet" : <div className='subscriptionsBox'>
                                {
                                    listSubs.map((item, ind) => {
                                        return (<Link onClick={()=>setSubscriberModal(false)} to={`/user/${item._id}`} className='personSubsc' key={item._id}>
                                            <div className='channelInfo-subs'>
                                                <img className='channel-info-profile' src={item.profilePic} />
                                                <div style={{textDecoration:"none",color:"black"}}>{item.channelName}</div>
                                            </div>
                                        </Link>);
                                    })
                                }

                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default SideNavbar