import React, {useState} from 'react'
import { Input, Button, Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { GiftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

const GetReward = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [promoteLink, setPromoteLink] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(0);

    const createPostReward = async () => {
        if (promoteLink.length < 1) {
            toast.error("Place a link in the Link Box");
        } else {
            try {
                const result = await fetch(promoteLink, { mode: 'no-cors' })
                if (result) {
                    const reward = await axios.post(
                        process.env.REACT_APP_API + "/university/create-post-reward", {promoteLink}, {
                        headers: {
                            authToken: token,
                        },
                    });
    
                    if (reward.data.err) {
                        toast.error(reward.data.err);
                    } else {
                        if (reward.data.reward) {
                            setIsModalOpen(true);
                            setRewardAmount(reward.data.reward.commission)
                        }
                    }
                }
            } catch (error) {
                toast.error("Sorry, that link you submitted doesn't exist. Try to post another promotion to your social media accounts, get the link and paste it in the Link Box");
            }
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return ( 
        <div style={{ padding: isMobile ? 0 : 30, paddingTop: 30 }}>
            <h4>Follow the instructions on the video below to get a Post Reward</h4>
            <iframe
                title="Welcome To Clavstore University"
                src={`https://player.vimeo.com/video/816776695?autoplay=1`}
                width="100%"
                height="280"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{
                    border: "none"
                }}
            />
            <br /><br />
            <strong style={{fontSize: 24}}>Link Box</strong>
            <br />
            <Input
                style={{
                    fontSize: 18,
                    width: isMobile ? "100%" : "50%"
                }}
                placeholder="Paste link of your post here"
                onChange={(e) => setPromoteLink(e.target.value)}
            />
            <br />
            <Button
                type="primary"
                style={{
                    width: isMobile ? "100%" : "50%",
                    height: isMobile ? 70 : 80,
                    fontSize: isMobile ? 18 : 24,
                    margin: "30px 0"
                }}
                onClick={() => createPostReward()}
            >
                <GiftOutlined /> Submit And Receive Reward
            </Button>

            <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null} >
                    <div align="center" style={{paddingTop: 20}}>
                        <img
                            src={
                                rewardAmount === 2 ? process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/congrats4.gif"
                                    : process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/congrats3.gif"
                            }
                            alt="Post Reward Received" width="80%"
                        />
                        <Button
                            type="default"
                            style={{
                                width: isMobile ? "100%" : "80%",
                                height: isMobile ? 70 : 80,
                                fontSize: isMobile ? 18 : 24,
                                margin: 30
                            }}
                            onClick={() => {
                                navigate("/home?tab=4")
                            }}
                        >
                            <GiftOutlined /> See Your Post Rewards
                        </Button>
                    </div>
            </Modal>
        </div>
     );
}
 
export default GetReward;