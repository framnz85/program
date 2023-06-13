import React, { useEffect, useState } from "react";
import { Layout, Menu, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { toast } from "react-toastify";

import NextSteps from "./NextSteps";
import Withdraw from "../account/Withdraw";

const { Header } = Layout;

const MainHeader = ({
  defaultKey,
  dashboard,
  setDashboard,
  noRegBonus = false,
  pathname = "",
  noRedirect = false,
}) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [stepModal, showStepModal] = useState(false);
  const [sessionUser, setSessionUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserDetails = async () => {
    if (!token) {
      if (!noRedirect) {
        if (pathname.length > 0) {
          navigate("/login", { state: { from: pathname } });
        } else {
          navigate("/login");
        }
      }
    } else {
      const user = await axios.get(
        process.env.REACT_APP_API + "/university/get-user",
        {
          headers: {
            authToken: token,
          },
        }
      );
      if (user.data.register) {
        toast.error(user.data.register);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/register");
      } else if (user.data.login) {
        toast.error(user.data.login);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      } else if (user.data.err) {
        toast.error(user.data.err);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      } else {
        const playWelcome = sessionStorage.getItem("playWelcome");
        delete user.data.password;

        setSessionUser(user.data);
        sessionStorage.setItem("programUser", JSON.stringify(user.data));

        if (!playWelcome) {
          checkNextStep(user.data);
        }

        const earning = await axios.get(
          process.env.REACT_APP_API + "/university/dashboard/" + user.data._id
        );

        if (earning.data.err) {
          toast.error(earning.data.err);
        } else {
          const totalCommission = earning.data.totalCommission;
          const totalWithdrawn = earning.data.totalWithdraw;
          const totalRemaining = totalCommission + totalWithdrawn;

          setDashboard({
            ...dashboard,
            userid: user.data._id,
            totalProducts: earning.data.totalProducts,
            totalCommission,
            totalWithdrawn,
            totalRemaining,
          });
        }
      }
    }
    const refid = queryParams.get("refid");

    if (
      !localStorage.getItem("refid") ||
      localStorage.getItem("refid") === "null"
    ) {
      localStorage.setItem("refid", refid);
    }
  };

  const checkNextStep = (user) => {
    if (user.programList && user.programList.length < 1) {
      showStepModal(true);
    }
  };

  const headerNav = isMobile
    ? [
        { key: 7, label: "Withdraw" },
        { key: 5, label: "Premium", destination: "/premium" },
      ]
    : [
        { key: 2, label: "Home", destination: "/home" },
        { key: 3, label: "Programs", destination: "/programs" },
        { key: 4, label: "My Programs", destination: "/myprograms" },
        { key: 6, label: "Promote", destination: "/promote" },
        { key: 5, label: "Premium", destination: "/premium" },
        { key: 7, label: "Withdraw" },
        { key: 1, label: "Account", destination: "/account" },
      ];

  const onNavChange = (value) => {
    if (value.key === "7") {
      setIsModalOpen(true);
    } else {
      const result = headerNav.filter(
        (head) => head.key === parseInt(value.key)
      );
      navigate(result[0].destination);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          paddingLeft: isMobile ? 10 : "",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[defaultKey]}
          items={headerNav.map((head) => ({
            key: head.key,
            label: head.label,
          }))}
          onClick={(value) => onNavChange(value)}
        />
        {!isMobile && (
          <h5
            style={{
              float: "right",
              marginTop: -45,
              color: "#ffffff",
            }}
          >
            Hi! {sessionUser && sessionUser.name}
          </h5>
        )}
      </Header>

      {!noRedirect && sessionUser._id && (
        <NextSteps
          sessionUser={sessionUser}
          stepModal={stepModal}
          showStepModal={showStepModal}
          noRegBonus={noRegBonus}
        />
      )}
      <Modal
        title="Withdraw Earnings"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Withdraw dashboard={dashboard} popup={true} />
      </Modal>
    </Layout>
  );
};

export default MainHeader;
