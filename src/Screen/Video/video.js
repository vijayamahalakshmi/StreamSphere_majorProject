import React, { useEffect, useState } from 'react';
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
const Video = () => {
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [likeNumber,setLikeNumber] = useState(0)
    const [comment, setComment] = useState([]);
    const [message, setMessage] = useState("")
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [subscriberText,setSubscribeText] = useState("Subscribe")
    let userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

    // const fetchData = async () => {
    //     await axios.get(`http://localhost:8000/api/getVideoById/${id}`).then(res => {
    //         console.log(res)
    //         setData(res.data.video)
    //         res.data.video.user.subscriber.includes(userInfo?._id)?setSubscribeText("Unsubscribe"):setSubscribeText("Subscribe")
    //         setVideoURL(res.data.video.videoLink);
    //         setLikeNumber(res.data.video.like)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    const fetchData = async () => {
        await axios.get(`http://localhost:8000/api/getVideoById/${id}`).then(res => {
            console.log(res);
            setData(res.data.video);
    
            const subscribers = res.data.video?.user?.subscriber;
            if (subscribers && Array.isArray(subscribers) && userInfo?._id) {
                setSubscribeText(subscribers.includes(userInfo._id) ? "Unsubscribe" : "Subscribe");
            } else {
                setSubscribeText("Subscribe");
            }
    
            setVideoURL(res.data.video.videoLink);
            setLikeNumber(res.data.video.like);
        }).catch(err => {
            console.log(err);
        });
    };
    

    const getComment = async () => {
        await axios.get(`http://localhost:8000/commentApi/comment/${id}`).then((resp) => {
            console.log(resp)
            setComment(resp.data)
            
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {


        fetchData()
        getComment()

    }, [])

    const handleComment = async () => {
        let body = {
            "message": message,
            "video": id
        }
        await axios.post('http://localhost:8000/commentApi/comment', body, { withCredentials: true }).then(resp => {
            console.log(resp)
            setComment([...comment,resp.data])
            setMessage("")
        }).catch(err => {
            toast.error("Please login For Comment")
            console.log(err)
        })
    }

    const likeUpdate = async()=>{
        setLike(prev => !prev)
        await axios.put(`http://localhost:8000/api/like/${id}`).then(resp=>{
            console.log(resp)
            setLikeNumber(resp.data.like)
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleOnClickProfile=()=>{
        let id = data?.user?._id;
        navigate(`/user/${id}`)
    }

    // const isSubscribed = ()=>{
    //     data?.user?.subscriber.map((item)=>{
    //         if(item._id===userInfo?._id){
    //             setSubscribeText("Unsubscribe")
    //             return true;
    //         }
    //     })
    //     setSubscribeText("Subscribe")

    //     return false;
    // }

    const handleSubscribe = async()=>{
        await axios.post(`http://localhost:8000/auth/subscribe`,{userId:data?.user?._id},{withCredentials:true}).then((response)=>{
            setSubscribeText("Unsubscribe")
        }).catch(err=>{
            console.log(err)
        })
    }
    const handleUnSubscribe = async()=>{
        await axios.post(`http://localhost:8000/auth/unsubscribe`,{userId:data?.user?._id},{withCredentials:true}).then((response)=>{
            setSubscribeText("Subscribe")
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && <video width="400" controls autoPlay className='video_youtube_video'>
                        {/* <source src={"https://res.cloudinary.com/mashhuudanny/video/upload/v1720350210/xo81mxhcvjckkw1tdp62.mp4"} type="video/mp4" /> */}

                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />

                        Your browser does not support the video tag.
                    </video>}

                </div>
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <div className="youtube_video_ProfileBlock_left_img" onClick={()=>handleOnClickProfile()}>
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} />
                            </div>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName"> {data?.user?.userName} </div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            {
                                userInfo?userInfo._id===data?.user?._id?null:<div className="subscribeBtnYoutube" onClick={subscriberText==="Subscribe"?handleSubscribe:handleUnSubscribe}>{subscriberText}</div>:null
                            }
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like" onClick={() =>likeUpdate()}>
                                {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                <div className='youtube_video_likeBlock_NoOfLikes'>{likeNumber}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbDownAltOutlinedIcon />

                            </div>
                        </div>

                    </div>
                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>
                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comment.length} Comments</div>
                    <div className="youtubeSelfComment">
                        <img src='https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7' className='video_youtubeSelfCommentProfile' />
                        <div className="addAComment">
                            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='addAcommentInput' placeholder='Add a comment' />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                                <div className="cancelComment" onClick={() => handleComment()}>Comment</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtubeOthersComments">
                        {
                            comment.map((item) => {
                                return (
                                    <div className="youtubeSelfComment">
                                        <img src={item.user.profilePic} className='video_youtubeSelfCommentProfile' />
                                        <div className="others_commentSection">
                                            <div className="others_commentSectionHeader">
                                                <div className="channelName_comment">{item.user.userName}</div>
                                                <div className="commentTimingOthers">{item.createdAt.slice(0,10)}</div>
                                            </div>
                                            <div className="otherCommentSectionComment">
                                               {item.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div>

            {/* <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <img src="https://th.bing.com/th/id/OIP.8gLtXrl4KYPfPA6QyMnlUwHaEK?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" className='video_suggetion_thumbnail_img' />
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
            </div> */}
            <ToastContainer/>
        </div>
    )
}

export default Video;