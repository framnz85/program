import React, { useState, useEffect } from "react";
import { Button, Radio, Space } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

import { currency } from "../common/currency";

const Paypal = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/paypal.png";
const BDO = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bdo.png";
const BPI = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/bpi.png";
const Unionbank =
  process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/union.png";
const Gcash = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/gcash.png";
const Maya = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/maya.png";

const PayInstruction = ({
  program,
  user,
  setUser,
  noRedirect,
  setDefaultPackage,
}) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }
  const paypalClientId =
    "ATy4_rfmeiT3mEPwjPOHoUFbNA_ZSsqGT9BvtkFkMW4io40J4kdX0NQpYM9YdSWXmawnKufvTNaEuuOg";

  const [payment, setPayment] = useState("pal");
  const [amount, setAmount] = useState("0");
  const [success, setSuccess] = useState(false);
  const [packageSelect, setPackageSelect] = useState("");

  useEffect(() => {
    fetchUserProgram();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserProgram = () => {
    const userProgram =
      user.programList &&
      user.programList.find((prog) => prog.progid._id === program._id);
    if (userProgram) {
      setPayment(userProgram.payment);
      setAmount(userProgram.amount);
      setPackageSelect(userProgram.package);
    }
  };

  const handleChangePackage = async (e) => {
    const programList = user.programList ? user.programList : [];
    const newProgramList = programList.map((prog) => {
      if (prog.progid._id === program._id) {
        const amountObj = prog.progid.packages.find(
          (pack) => pack._id === e.target.value
        );
        setAmount(amountObj.discountPrice);
        return {
          ...prog,
          amount: amountObj.discountPrice,
          package: e.target.value,
        };
      } else {
        return prog;
      }
    });
    handleUpdateUser(newProgramList);
    setPackageSelect(e.target.value);
    if (payment === "pal") {
      setPayment("");
      setTimeout(() => {
        setPayment("pal");
      }, 2000);
    }
    const choosenPackage = program.packages.find(
      (pack) => pack._id === e.target.value
    );
    setDefaultPackage(choosenPackage);
    await axios.post(
      process.env.REACT_APP_API + "/university/add-update-earning",
      { program, choosenPackage },
      {
        headers: {
          authToken: token,
        },
      }
    );
  };

  const handleChangePayment = (e) => {
    const programList = user.programList ? user.programList : [];
    const newProgramList = programList.map((prog) =>
      prog.progid._id === program._id
        ? { ...prog, payment: e.target.value }
        : prog
    );
    handleUpdateUser(newProgramList);
    setPayment(e.target.value);
  };

  const handleUpdateUser = async (programList) => {
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
    }
  };

  const handleApprove = async (sellerTxnID) => {
    const billingHistory = user.billingHistory ? user.billingHistory : [];
    if (sellerTxnID) {
      setSuccess(true);
      const newBillingHistory = billingHistory.map((bill) => {
        return bill.payStatus === "pending"
          ? { ...bill, subscriptionID: sellerTxnID }
          : bill;
      });
      const updateUser = await axios.put(
        process.env.REACT_APP_API + "/university/update-user",
        { email: user.email, premium: 2, billingHistory: newBillingHistory }
      );
      if (updateUser.data.err) {
        toast.error(updateUser.data.err);
      } else {
        sessionStorage.setItem(
          "programUser",
          JSON.stringify({
            ...user,
            premium: 2,
            billingHistory: newBillingHistory,
          })
        );
      }
    }
  };

  const packageStyle = {
    padding: 10,
    borderRadius: 6,
    textAlign: "left",
    width: isMobile ? 300 : 450,
  };

  return (
    <>
      <br />
      <br />
      <h5>Select Your Package Below</h5>
      <br />
      <Radio.Group onChange={handleChangePackage} value={packageSelect}>
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
      <div
        style={{
          width: isMobile ? "100%" : noRedirect ? "30%" : "80%",
          marginTop: 20,
          color: "#FF5C5C",
          fontSize: 28,
          border: "1px solid #FF5C5C",
          borderRadius: 8,
          padding: 25,
        }}
      >
        Your enrollment is pending, waiting for payment...
      </div>
      {!noRedirect && amount !== "Free" && (
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
                user._id
              }`
            )
          }
        >
          See The Details Again
        </Button>
      )}

      <div
        align="center"
        style={{
          marginTop: 20,
          fontSize: 18,
          borderRadius: 8,
          width: isMobile ? "100%" : "80%",
        }}
      >
        <h3>Choose Payment Below</h3>
        <span style={{ color: "#f00", fontSize: 24 }}>
          Total Amount to Pay Now:{" "}
          <b>
            {payment === "pal" ? "$" : "₱"}
            {(payment === "pal" ? amount / 50 : amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </b>
          {payment !== "pal" && (
            <h6>
              WARNING: Send your payments only to the Account Number and Account
              Name shown below. We are not liable for lost payment that are not
              sent directly to our accounts.
            </h6>
          )}
        </span>
        <br />
        <br />
        <Radio.Group
          onChange={handleChangePayment}
          value={payment && payment.toString()}
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
          <br />
          <Radio.Button value="uni" style={{ height: 80 }}>
            <img
              src={Unionbank}
              width="100"
              height="50"
              alt="Unionbank Payment"
            />
            <br />
            Unionbak Deposit or Online
          </Radio.Button>
          <Radio.Button value="gca" style={{ height: 80 }}>
            <img src={Gcash} width="100" height="50" alt="Gcash Payment" />
            <br />
            Gcash Send
          </Radio.Button>
          <Radio.Button value="may" style={{ height: 80 }}>
            <img src={Maya} width="100" height="50" alt="Maya Payment" />
            <br />
            Maya Send Money
          </Radio.Button>
        </Radio.Group>
        <br />
        <br />
        {payment === "pal" && !success && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PayPalScriptProvider
              options={{ "client-id": paypalClientId, currency: "USD" }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description:
                          "Payment for OGPA Workshop - email: " + user.email,
                        amount: {
                          value: Number(amount / 50).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  handleApprove(
                    order.purchase_units[0].payments.captures[0].id
                  );
                }}
                onError={(err) => {
                  toast.error(err);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
        {payment === "pal" && success && (
          <div>
            <div align="center" className="alert alert-success" role="alert">
              <h2 style={{ color: "green" }}>
                Success!!! Thank you for your Payment.
              </h2>
              Please notify us together with your email registered{" "}
              <b>{user.email}</b> that you have paid the workshop by emailing us
              at davgros.85@gmail.com or chat us on my{" "}
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                FB Account "Francis Clavano"
              </a>{" "}
              so we can approve your registration.
            </div>
            <br />
          </div>
        )}
        {payment === "bdo" && (
          <div>
            <div align="center" className="alert alert-success" role="alert">
              <b>Here's how to Pay:</b>
              <br />
              Send your payments by going to the nearest BDO branch or by
              transferring thru your BDO Online Banking and by using the details
              below: <br />
              <br />
              <div align="center">
                <b>Account Number:</b> 006760032739
                <br />
                <b>Account Name:</b> Francis John Clavano
                <br />
                <b>Amount:</b> ₱
                {amount &&
                  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <br />
              <br />
              After sending the payment, send the screenshot of your Payment
              Receipt together with the email address you registered here{" "}
              <b>{user.email}</b> to davgros.85@gmail.com or chat it on my{" "}
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                FB Account "Francis Clavano"
              </a>
              .
            </div>
            <br />
          </div>
        )}
        {payment === "bpi" && (
          <div>
            <div align="center" className="alert alert-success" role="alert">
              <b>Here's how to Pay:</b>
              <br />
              Send your payments by going to the nearest BPI branch or by
              transferring thru your BPI Online Banking and by using the details
              below: <br />
              <br />
              <div align="center">
                <b>Account Number:</b> 2149704874
                <br />
                <b>Account Name:</b> Francis John Clavano
                <br />
                <b>Amount:</b> ₱
                {amount &&
                  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <br />
              <br />
              After sending the payment, send the screenshot of your Payment
              Receipt together with the email address you registered here{" "}
              <b>{user.email}</b> to davgros.85@gmail.com or chat it on my{" "}
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                FB Account "Francis Clavano"
              </a>
              .
            </div>
            <br />
          </div>
        )}
        {payment === "uni" && (
          <div>
            <div align="center" className="alert alert-success" role="alert">
              <b>Here's how to Pay:</b>
              <br />
              Send your payments by going to the nearest Unionbank branch or by
              transferring thru your Unionbank Online Banking and by using the
              details below: <br />
              <br />
              <div align="center">
                <b>Account Number:</b> 109430284113
                <br />
                <b>Account Name:</b> Francis John Clavano
                <br />
                <b>Amount:</b> ₱
                {amount &&
                  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <br />
              <br />
              After sending the payment, send the screenshot of your Payment
              Receipt together with the email address you registered here{" "}
              <b>{user.email}</b> to davgros.85@gmail.com or chat it on my{" "}
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                FB Account "Francis Clavano"
              </a>
              .
            </div>
            <br />
          </div>
        )}
        {payment === "gca" && (
          <div>
            <div align="center" className="alert alert-success" role="alert">
              <b>Here's how to Pay:</b>
              <br />
              Send your payments by logging in to your Gcash App and choose
              Send. Then provide the details below: <br />
              <br />
              <div align="center">
                <b>Account/Mobile Number:</b> 09778557778
                <br />
                <b>Account Name:</b> Francis John Clavano
                <br />
                <b>Amount:</b> ₱
                {amount &&
                  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <br />
              <br />
              After sending the payment, send the screenshot of your Payment
              Receipt together with the email address you registered here{" "}
              <b>{user.email}</b> to davgros.85@gmail.com or chat it on my{" "}
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                FB Account "Francis Clavano"
              </a>
              .
            </div>
            <br />
          </div>
        )}
        {payment === "may" && (
          <div>
            <div align="center" className="alert alert-success" role="alert">
              <b>Here's how to Pay:</b>
              <br />
              Send your payments by logging in to your Maya App and choose Send
              money. Then provide the details below: <br />
              <br />
              <div align="center">
                <b>Account/Mobile Number:</b> 09778557778
                <br />
                <b>Account Name:</b> Francis John Clavano
                <br />
                <b>Amount:</b> ₱
                {amount &&
                  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <br />
              <br />
              After sending the payment, send the screenshot of your Payment
              Receipt together with the email address you registered here{" "}
              <b>{user.email}</b> to davgros.85@gmail.com or chat it on my{" "}
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                FB Account "Francis Clavano"
              </a>
              .
            </div>
            <br />
          </div>
        )}
      </div>
    </>
  );
};

export default PayInstruction;
