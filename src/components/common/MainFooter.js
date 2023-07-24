import React, { useEffect, useState } from "react";
import { Layout, Modal, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import { GiftOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const MainFooter = ({ setTabMenu = () => "", noRedirect = false }) => {
  const navigate = useNavigate();
  const dateToday = new Date().toDateString();
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }
  const stopPostReward = localStorage.getItem("stopPostReward");
  const queryParams = new URLSearchParams(window.location.search);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rewardType, setRewardType] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);

  useEffect(() => {
    if (!noRedirect) {
      checkLoginToday();
    }
    if (queryParams.get("nomodal")) {
      sessionStorage.setItem("nomodal", "1");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkLoginToday = async () => {
    const result = await axios.get(
      process.env.REACT_APP_API + "/university/check-login-today",
      {
        headers: {
          authToken: token,
        },
      }
    );

    if (result.data.err) {
      toast.error(result.data.err);
    } else {
      if (
        !result.data.loginToday &&
        !queryParams.get("nomodal") &&
        !sessionStorage.getItem("nomodal")
      ) {
        setIsModalOpen(true);
        setRewardType(1);
      } else {
        setIsModalOpen(false);
        setRewardType(0);
        checkPostToday();
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createLoginReward = async () => {
    const reward = await axios.post(
      process.env.REACT_APP_API + "/university/create-login-reward",
      {},
      {
        headers: {
          authToken: token,
        },
      }
    );

    if (reward.data.err) {
      toast.error(reward.data.err);
    } else {
      if (
        reward.data.reward &&
        !queryParams.get("nomodal") &&
        !sessionStorage.getItem("nomodal")
      ) {
        setIsModalOpen(true);
        setRewardType(2);
        setRewardAmount(reward.data.reward.commission);
      }
    }
  };

  const checkPostToday = async () => {
    const result = await axios.get(
      process.env.REACT_APP_API + "/university/check-post-today",
      {
        headers: {
          authToken: token,
        },
      }
    );

    if (result.data.err) {
      toast.error(result.data.err);
    } else {
      if (
        !result.data.postToday &&
        !sessionStorage.getItem("postPrompt") &&
        stopPostReward !== dateToday &&
        !queryParams.get("nomodal") &&
        !sessionStorage.getItem("nomodal")
      ) {
        setIsModalOpen(true);
        setRewardType(3);
      } else {
        setIsModalOpen(false);
        setRewardType(0);
      }
    }
  };

  return (
    <>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        NOTE: You will earn P1 each person who successfully registered using
        your Clavstore University Affiliate Links.{" "}
        <Link to="/program/clavstore-affiliate-training">
          Go To Affiliate Links
        </Link>
      </Footer>
      <Modal title="" open={isModalOpen} onCancel={handleCancel} footer={null}>
        {rewardType === 1 && (
          <>
            <div align="center" style={{ paddingTop: 20 }}>
              <h5>Thank you for logging in back!!!</h5> Receive your today's
              Login Reward by pressing the button below.
              <br />
              <img
                src={
                  process.env.REACT_APP_CLAVMALL_IMG +
                  "/funnel_images/loginreward.jpg"
                }
                alt="Login Reward"
                width="80%"
              />
              <Button
                type="primary"
                style={{
                  width: isMobile ? "100%" : "80%",
                  height: isMobile ? 70 : 80,
                  fontSize: isMobile ? 18 : 24,
                  margin: "30px 0",
                }}
                onClick={() => createLoginReward()}
              >
                <GiftOutlined /> Receive Login Reward
              </Button>
            </div>
          </>
        )}
        {rewardType === 2 && (
          <>
            <div align="center" style={{ paddingTop: 20 }}>
              <img
                src={
                  rewardAmount === 2
                    ? process.env.REACT_APP_CLAVMALL_IMG +
                      "/funnel_images/congrats2.gif"
                    : process.env.REACT_APP_CLAVMALL_IMG +
                      "/funnel_images/congrats1.gif"
                }
                alt="Login Reward Received"
                width="80%"
              />
              <Button
                type="primary"
                style={{
                  width: isMobile ? "100%" : "80%",
                  height: isMobile ? 70 : 80,
                  fontSize: isMobile ? 18 : 24,
                  margin: "30px 0",
                }}
                onClick={() => checkPostToday()}
              >
                <GiftOutlined /> Receive Another Reward
              </Button>
              <Button
                type="default"
                style={{
                  width: isMobile ? "100%" : "80%",
                  height: isMobile ? 70 : 80,
                  fontSize: isMobile ? 18 : 24,
                  marginBottom: 30,
                }}
                onClick={() => {
                  setTabMenu(3);
                  setIsModalOpen(false);
                }}
              >
                <GiftOutlined /> See Your Login Rewards
              </Button>
            </div>
          </>
        )}
        {rewardType === 3 && (
          <>
            <div align="center" style={{ paddingTop: 20 }}>
              <h5>Earn your Post Reward now!!!</h5>{" "}
              <h6>Follow the instructions shown in the video.</h6>
              <br />
              <iframe
                title="Welcome To Clavstore University"
                src={`https://player.vimeo.com/video/816776695?autoplay=1`}
                width="100%"
                height="280"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{
                  border: "none",
                }}
              />
              <Button
                type="primary"
                style={{
                  width: isMobile ? "100%" : "80%",
                  height: isMobile ? 70 : 80,
                  fontSize: isMobile ? 18 : 24,
                  margin: "30px 0",
                }}
                onClick={() => {
                  sessionStorage.setItem("postPrompt", 1);
                  navigate("/promote");
                  setIsModalOpen(false);
                }}
              >
                <GiftOutlined /> Go To Promote Now
              </Button>
              <Button
                type="default"
                style={{
                  width: isMobile ? "100%" : "80%",
                  height: isMobile ? 40 : 50,
                  fontSize: isMobile ? 14 : 18,
                  marginBottom: 30,
                }}
                onClick={() => {
                  localStorage.setItem("stopPostReward", dateToday);
                  setIsModalOpen(false);
                }}
              >
                Stop Reminders For Today
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default MainFooter;
