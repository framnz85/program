import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import 'quill/dist/quill.snow.css';

import "./css/infocheck.css";
import "./css/recovery.css";

import TabBottom from "./components/common/TabBottom";

const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const InfoCheck = lazy(() => import("./pages/InfoCheck"));
const Recovery = lazy(() => import("./pages/Recovery"));
const RecoverForm = lazy(() => import("./pages/RecoverForm"));
const RecoverCode = lazy(() => import("./pages/RecoverCode"));
const Reward = lazy(() => import("./pages/Reward"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgDetails = lazy(() => import("./components/programs/ProgDetails"));
const AccessProgram = lazy(() => import("./components/programs/AccessProgram"));
const MyPrograms = lazy(() => import("./pages/MyPrograms"));
const AddProgram = lazy(() => import("./pages/AddProgram"));
const EditProgram = lazy(() => import("./pages/EditProgram"));
const SalesProgram = lazy(() => import("./pages/SalesProgram"));
const Promote = lazy(() => import("./pages/Promote"));
const Premium = lazy(() => import("./pages/Premium"));
const Account =  lazy(() => import("./pages/Account"));
const Ogpa = lazy(() => import("./pages/Ogpa"));
const OgpaForm = lazy(() => import("./pages/OgpaForm"));
const OgpaReg = lazy(() => import("./pages/OgpaReg"));
const OgpaPay = lazy(() => import("./pages/OgpaPay"));

function App() {
  let sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
  let token = localStorage.getItem("token");
  if (!token) {
      token = sessionStorage.getItem("token");
  }

  const [showTab, setShowTab] = useState(true);
  
  useEffect(() => {
    if (token) {
      getServiceWorker();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
          await navigator.serviceWorker.register('./serviceWorker.js');
      }
  }

  const subscribe = async () => {
    if ('serviceWorker' in navigator) {
      let sw = await navigator.serviceWorker.ready;
      let push = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BEF3iDEv-jEKmt9837kUHg5NSQeyI_nwgx9aUPVyvlWCEuCIU1DrAh58NKqo-LhOgqvyCnAbTOgvhW05j8frPFc"
      });
      updateUserEndPoint(JSON.stringify(push));
    }
  }

  const updateUserEndPoint = async (pushData) => {
    if (!sessionUser) {
      const user = await axios.get(
        process.env.REACT_APP_API + "/university/get-user", {
        headers: {
            authToken: token,
        },
      });

      if (user.data.err) {
        toast.error(user.data.err);
      }else{
        sessionUser = user.data;
        sessionStorage.setItem("programUser", JSON.stringify(user.data));
      }
    }

    const endPoint = sessionUser.endPoint ? sessionUser.endPoint : [];
    
    endPoint.push(pushData);

    const values = { ...sessionUser, endPoint };
    
    const updateUser = await axios.put(
        process.env.REACT_APP_API + "/university/update-user",
        values,
        {
            headers: {
                authToken: token,
            },
        }
    );
    if (updateUser.data.err) {
        toast.error(updateUser.data.err);
    } else {
        sessionStorage.setItem("programUser", JSON.stringify(values));
        toast.success("Profile successfully updated! We will notify you everyday once your Login and Post Reward are ready");
        new Notification("Enabling Notification, Thank You!", {
          body: "We will notify you everyday once your Login and Post Reward are ready",
          icon: 'https://clavstoreimages.etnants.com/funnel_images/clavstoreuniversity.png',
          data: {
            url: '/'
          }
        })
    } 
  };
  
  const notifyUser = () => {
    if (!("Notification" in window) || !('serviceWorker' in navigator)) {
      toast.error("Browser does not support notifications");
    } else if (Notification.permission !== "granted") {
      subscribe();
    }
  }

  const checkNotification = () => {
    if (("Notification" in window) && ('serviceWorker' in navigator)) {
      return Notification.permission
    }
  }
  
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="col text-center p-5">
            __ Preparing the Page
            <LoadingOutlined />
            RE. Kindly wait... __
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/programs" element={<Programs />} />
          <Route exact path="/program/:slug" element={<ProgDetails />} />
          <Route exact path="/access/:slug" element={<AccessProgram />} />
          <Route exact path="/myprograms" element={<MyPrograms />} />
          <Route exact path="/myprogram/add" element={<AddProgram />} />
          <Route exact path="/myprogram/edit/:slug" element={<EditProgram />} />
          <Route exact path="/p/:slug" element={<SalesProgram setShowTab={setShowTab} />} />
          <Route exact path="/promote" element={<Promote />} />
          <Route exact path="/promote/:slug" element={<Promote />} />
          <Route exact path="/premium" element={<Premium />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/infocheck" element={<InfoCheck />} />
          <Route exact path="/recovery" element={<Recovery />} />
          <Route exact path="/recoverform" element={<RecoverForm />} />
          <Route exact path="/recovercode" element={<RecoverCode />} />
          <Route exact path="/reward" element={<Reward />} />
          <Route exact path="p/ogpa-program" element={<Ogpa />} />
          <Route exact path="p/ogpaform" element={<OgpaForm />} />
          <Route exact path="p/ogpareg" element={<OgpaReg />} />
          <Route exact path="p/ogpapay" element={<OgpaPay />} />
        </Routes>
      </Suspense>
      {showTab && <TabBottom notifyUser={notifyUser} checkNotification={checkNotification} />}
      <ToastContainer />
    </div>
  );
}

export default App;
