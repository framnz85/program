import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Modal } from "antd";

import { RiHomeSmile2Line, RiHomeSmile2Fill } from "react-icons/ri";
import {
  AiOutlineFile,
  AiFillFile,
  AiOutlineFileAdd,
  AiFillFileAdd,
  AiOutlineUser,
} from "react-icons/ai";
import { BsFillPersonFill, BsTrophy, BsTrophyFill } from "react-icons/bs";

const TabBottom = ({ notifyUser, checkNotification }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [activeTabs, setActiveTabs] = useState(location.pathname);
  const [notifyRequest, showNotitfyRequest] = useState(false);

  useEffect(() => {
    navigateTab(activeTabs);
    if (token) {
      setTimeout(() => {
        const permission = checkNotification();
        if (
          token &&
          permission &&
          permission !== "granted" &&
          !queryParams.get("nomodal") &&
          !queryParams.get("noRedirect")
        ) {
          showNotitfyRequest(true);
        }
      }, 5000);
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOk = () => {
    notifyUser();
    showNotitfyRequest(false);
  };
  const handleCancel = () => {
    showNotitfyRequest(false);
    const permission = checkNotification();
    if (token && permission && permission !== "granted") {
      setTimeout(() => showNotitfyRequest(true), 30000);
    }
  };

  const navigateTab = (tabs) => {
    setActiveTabs(tabs);
    switch (tabs) {
      case "/home":
        navigate("/home");
        break;
      case "/programs":
        navigate("/programs");
        break;
      case "/myprograms":
        navigate("/myprograms");
        break;
      case "/promote":
        navigate("/promote");
        break;
      case "/account":
        navigate("/account");
        break;
      default:
        break;
    }
  };

  const tabStyle = {
    containier: {
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#fff",
    },
    bottomNav: {
      width: window.innerWidth,
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderTop: "1px solid rgb(230, 230, 230)",
    },
    bnTab: {
      width: "25%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  };

  return (
    <div style={tabStyle.containier}>
      {isMobile && token && (
        <div style={tabStyle.bottomNav}>
          <div style={tabStyle.bnTab} onClick={() => navigateTab("/home")}>
            <div>
              {activeTabs === "/home" ? (
                <RiHomeSmile2Fill size="27" color="#009A57" />
              ) : (
                <RiHomeSmile2Line size="27" color="#009A57" />
              )}
            </div>
            <div style={{ fontSize: 10 }}>Home</div>
          </div>
          <div style={tabStyle.bnTab} onClick={() => navigateTab("/programs")}>
            <div>
              {activeTabs === "/programs" ? (
                <AiFillFile size="25" color="#009A57" />
              ) : (
                <AiOutlineFile size="25" color="#009A57" />
              )}
            </div>
            <div style={{ fontSize: 10 }}>Programs</div>
          </div>
          <div
            style={tabStyle.bnTab}
            onClick={() => navigateTab("/myprograms")}
          >
            <div>
              {activeTabs === "/myprograms" ? (
                <AiFillFileAdd size="25" color="#009A57" />
              ) : (
                <AiOutlineFileAdd size="25" color="#009A57" />
              )}
            </div>
            <div style={{ fontSize: 10 }}>My Programs</div>
          </div>
          <div style={tabStyle.bnTab} onClick={() => navigateTab("/promote")}>
            <div>
              {activeTabs === "/promote" ? (
                <BsTrophyFill size="23" color="#009A57" />
              ) : (
                <BsTrophy size="23" color="#009A57" />
              )}
            </div>
            <div style={{ fontSize: 10 }}>Promote</div>
          </div>
          <div style={tabStyle.bnTab} onClick={() => navigateTab("/account")}>
            <div>
              {activeTabs === "/account" ? (
                <BsFillPersonFill size="28" color="#009A57" />
              ) : (
                <AiOutlineUser size="28" color="#009A57" />
              )}
            </div>
            <div style={{ fontSize: 10 }}>Account</div>
          </div>
        </div>
      )}
      <Modal
        title="Notification Request"
        open={notifyRequest}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Send Me"
      >
        <br />
        <p>
          To maximize your profitability, we require you to allow us to send you
          notification when your Login Reward and Post Reward are ready for the
          day.
        </p>
        <br />
      </Modal>
    </div>
  );
};

export default TabBottom;
