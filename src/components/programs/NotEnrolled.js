import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Radio, Modal, Space } from "antd";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { toast } from "react-toastify";

import RegisterExist from "./RegisterExist";
import Register from "../../pages/Register";

import { currency } from "../common/currency";

const Paypal = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/paypal.png";
const BDO = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bdo.png";
const BPI = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bpi.png";
const Unionbank =
  process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/union.png";
const Gcash = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/gcash.png";
const Maya = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/maya.png";

const NotEnrolled = ({
  program,
  user,
  setUser,
  pathname = "",
  noRedirect,
  setDefaultPackage,
}) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState("pal");
  const [packageSelect, setPackageSelect] = useState("");

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    const programList = user.programList ? user.programList : [];

    const progExist = programList.filter(
      (prog) => prog.progid._id === program._id
    );

    const choosenPackage = program.packages.find(
      (pack) => pack._id === packageSelect
    );

    if (progExist.length < 1) {
      programList.push({
        progid: program._id,
        amount:
          choosenPackage.discountPrice === "Free"
            ? 0
            : parseFloat(choosenPackage.discountPrice),
        payment,
        status: choosenPackage.discountPrice === "Free",
        steps: 1,
        package: packageSelect,
      });
    }

    const updateUser = await axios.put(
      process.env.REACT_APP_API + "/university/update-user",
      { programList },
      {
        headers: {
          authToken: token,
        },
      }
    );
    if (updateUser.data.err) {
      toast.error(updateUser.data.err);
    } else {
      sessionStorage.setItem("programUser", JSON.stringify(updateUser.data));
      setUser(updateUser.data);
      await axios.post(
        process.env.REACT_APP_API + "/university/add-update-earning",
        { program, choosenPackage },
        {
          headers: {
            authToken: token,
          },
        }
      );
    }
    setIsModalOpen(false);
  };

  const packageStyle = {
    padding: 10,
    borderRadius: 6,
    textAlign: "left",
    width: isMobile ? 300 : 450,
  };

  return (
    <div>
      <br />
      <h5>Select Your Package Below</h5>
      <br />
      <Radio.Group
        onChange={(e) => {
          setPackageSelect(e.target.value);
          const choosenPackage = program.packages.find(
            (pack) => pack._id === e.target.value
          );
          setDefaultPackage(choosenPackage);
        }}
        value={packageSelect}
      >
        <Space direction="vertical">
          {program.packages &&
            program.packages.map((pack) => {
              const curSymbol = currency.filter(
                (cur) => cur.currency === pack.currency
              );
              return (
                <Radio
                  key={pack._id}
                  value={pack._id}
                  style={{
                    ...packageStyle,
                    border:
                      packageSelect === pack._id
                        ? "1px solid #0080ff"
                        : "1px solid #ccc",
                  }}
                >
                  {pack.name}
                  <br />
                  {curSymbol[0] && curSymbol[0].symbol}
                  {pack.discountPrice &&
                    pack.discountPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Radio>
              );
            })}
        </Space>
      </Radio.Group>
      <br />
      <Button
        type="primary"
        size="large"
        style={{
          height: 70,
          fontSize: 24,
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: 25,
          width: isMobile ? "100%" : noRedirect ? "30%" : "80%",
        }}
        onClick={() => {
          if (packageSelect) {
            setIsModalOpen(true);
          } else {
            toast.error("Please select a package first");
          }
        }}
      >
        Click Here To Enroll
      </Button>
      <br />
      {!noRedirect &&
        program &&
        program.packages &&
        program.packages[0] &&
        program.packages[0].discountPrice !== "Free" && (
          <Button
            type="default"
            size="large"
            style={{
              height: 70,
              fontSize: 24,
              paddingLeft: 40,
              paddingRight: 40,
              marginTop: 25,
              width: isMobile ? "100%" : noRedirect ? "30%" : "80%",
            }}
            onClick={() =>
              navigate(
                `/${program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${
                  user && user._id
                }`
              )
            }
          >
            See The Full Details
          </Button>
        )}

      {token ? (
        <Modal
          title="Enroll To This Program?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Enroll"
        >
          <div align="center" style={{ padding: 20 }}>
            <h5>Choose a Payment Below</h5>
            <p style={{ color: "red" }}>
              Total Amount:{" "}
              {program.discountPrice === "Free" ? (
                program.discountPrice
              ) : (
                <>
                  ₱
                  {program.discountPrice &&
                    program.discountPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </>
              )}
            </p>
            {program.discountPrice !== "Free" && (
              <Radio.Group
                onChange={(e) => setPayment(e.target.value)}
                defaultValue="pal"
              >
                <Radio.Button value="pal" style={{ height: 80 }}>
                  <img
                    src={Paypal}
                    width="100"
                    height="50"
                    alt="Card Payment or Paypal"
                  />
                  <br />
                  Credit / Debit Card
                </Radio.Button>
                <Radio.Button value="bdo" style={{ height: 80 }}>
                  <img src={BDO} width="100" height="50" alt="BDO Payment" />
                  <br />
                  BDO Deposit or Online
                </Radio.Button>
                <Radio.Button value="bpi" style={{ height: 80 }}>
                  <img src={BPI} width="100" height="50" alt="BPI Payment" />
                  <br />
                  BPI Deposit or Online
                </Radio.Button>
                <Radio.Button value="uni" style={{ height: 80 }}>
                  <img
                    src={Unionbank}
                    width="100"
                    height="50"
                    alt="Unionbank Payment"
                  />
                  <br />
                  Unionbank Deposit or Online
                </Radio.Button>
                <Radio.Button value="gca" style={{ height: 80 }}>
                  <img
                    src={Gcash}
                    width="100"
                    height="50"
                    alt="Gcash Payment"
                  />
                  <br />
                  Gcash Send
                </Radio.Button>
                <Radio.Button value="may" style={{ height: 80 }}>
                  <img src={Maya} width="100" height="50" alt="Maya Payment" />
                  <br />
                  Maya Send Money
                </Radio.Button>
              </Radio.Group>
            )}
            <br />
          </div>
        </Modal>
      ) : (
        <Modal
          title="Registration"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Register regFromProg={true} pathname={pathname} />
        </Modal>
      )}
      {program && program._id === "640c66fd8d23ede1246298de" && !noRedirect && (
        <RegisterExist
          program={program}
          user={user}
          setUser={setUser}
          payment={payment}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default NotEnrolled;
