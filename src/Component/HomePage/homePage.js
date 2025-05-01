import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ sideNavbar }) => {
    const [video, setVideos] = useState([]);
    const [loader, setLoader] = useState(false);

    const options = ["All", "Twenty20 Cricket", "Music", "Live", "Mixes", "Gaming", "Debates", "Coke Studio Pakistan", "Democracy", "Pakistani dramas", "Comedy", "Pakistani dramas", "Comedy", "Pakistani dramas", "Comedy",];
    const location = useLocation();
const query = new URLSearchParams(location.search).get('q');

    // useEffect(() => {
    //     const fetchVideo = async () => {
    //         setLoader(true)
    //         await axios("http://localhost:8000/api/allVideo").then((res) => {
    //             console.log(res);
    //             setLoader(false)
    //             setVideos(res.data.videos)
    //         }).catch(err => {
    //             console.log(err)
    //             setLoader(false)

    //         })
    //     }

    //     fetchVideo();
    // }, [])
    useEffect(() => {
        const fetchVideos = async () => {
            setLoader(true);
            try {
                const url = query
                    ? `http://localhost:8000/api/video/search?q=${query}`
                    : `http://localhost:8000/api/allVideo`;

                const res = await axios.get(url);
                setVideos(res.data.videos);
            } catch (err) {
                console.error(err);
            } finally {
                setLoader(false);
            }
        };

        fetchVideos();
    }, [query]);
    return (
        <div className={sideNavbar ? "homePage" : "fullHomePage"}>
            {/* {activeLinik} */}
            {/* <div className="homePage_options">
                {
                    options.map((item, index) => {
                        return (
                            <div key={index} className="homePage_option">
                                {item}
                            </div>
                        );
                    })
                }

            </div> */}
            <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>

                {
                    video.map((item, index) => {
                        return (
                            <Link to={`/watch/${item._id}`} className="youtube_Video">
                                <div className="youtube_thumbnailBox">
                                    <img className='youtube_thumbnailPic' src={item.thumbnail} alt='thumbnail' />
                                    
                                </div>
                                <div className="youtubeTitleBox">
                                    <div className="youtubeTitleBoxProfile">
                                        <img src={item.user.profilePic} className='youtube_thumbnail_Profile' />
                                    </div>
                                    <div className="youtubeTitleBox_Title">
                                        <div className="youtube_videoTitle">{item.title}</div>
                                        <div className="youtube_channelName">{item.user.channelName}</div>
                                        <div className='youtubeVideo_views'>{item.like} likes</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                }






            </div>
        </div>
    )
}

export default HomePage