import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
const Profile = ({ sideNavbar }) => {
    const [profileData, setProfileData] = useState(null);
    const [video, setVideo] = useState([])
    const navigate = useNavigate();
    let { id } = useParams();
    const fetchData = async () => {
        await axios.get(`http://localhost:8000/api/${id}/channel`).then(resp => {
            let val = resp.data.video
            setProfileData(val[0].user)
            setVideo(val);
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchData()
    }, [id])
    let userInfo =localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")):null;
    return (
        <div className="profile">
            <SideNavbar sideNavbar={sideNavbar} />
            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img className='profile_top_section_img' src={video.length?profileData?.profilePic:userInfo?.profilePic} alt="" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">{video.length?profileData?.channelName:userInfo.channelName}</div>
                        <div className="profile_top_section_info">
                            @{video.length===0?userInfo?.userName:profileData?.userName}  . {video.length} videos
                        </div>
                        <div className="profile_top_section_info">
                            {video.length?profileData?.about:userInfo?.about}
                        </div>
                    </div>
                </div>
                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <PlayArrowIcon /></div>
                    <div className="profileVideos">
                        {
                            video.map((item, ind) => {
                                return (
                                    <div className="profileVideo_block" onClick={()=>navigate(`/watch/${item._id}`)}>
                                        <div className="profileVideo_block_thumbnail">
                                            <img className='profileVideo_block_thumbnail_img' src={item.thumbnail} />
                                        </div>
                                        <div className="profileVideo_block_detail">
                                            <div className="profileVideo_block_detail_name">{item.title} </div>
                                            <div className="profileVideo_block_detail_about">Create at {item.createdAt}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }




                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile