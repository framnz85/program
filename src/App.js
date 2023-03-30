import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import 'quill/dist/quill.snow.css';

import "./css/infocheck.css";
import "./css/recovery.css";

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
          <Route exact path="/myprogram/edit/:slug" element={<EditProgram />} />
          <Route exact path="/p/:slug" element={<SalesProgram />} />
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
      <ToastContainer />
    </div>
  );
}

export default App;
