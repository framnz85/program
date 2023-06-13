import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Layout } from "antd";
import slugify from "react-slugify";
import { useNavigate } from "react-router-dom";

import MainHeader from "../components/common/MainHeader";
import MainFooter from "../components/common/MainFooter";
import Navigator from "../components/common/Navigator";
import ProgDetails from "../components/myprogs/ProgDetails";
import Packages from "../components/myprogs/Packages";
import SalesPage from "../components/myprogs/SalesPage";

const initialState = {
  totalProducts: 0,
  totalCommission: 0,
  totalWithdrawn: 0,
  totalRemaining: 0,
};

const EditProgram = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [tabMenu, setTabMenu] = useState(1);
  const [program, setProgram] = useState({});
  const [dashboard, setDashboard] = useState(initialState);

  useEffect(() => {
    fetchProgram();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProgram = async () => {
    const result = await axios.get(
      process.env.REACT_APP_API + "/university/program/" + slug
    );
    if (result.data.err) {
      toast.error(result.data.err);
    } else {
      if (sessionUser._id === result.data.owner) {
        setProgram(result.data);
      } else {
        toast.error("Sorry! You are not the owner of that program.");
        navigate("/myprograms");
      }
    }
  };

  const handleSubmit = async (updatedProg) => {
    if (sessionUser._id === updatedProg.owner) {
      const progToSubmit = {
        ...updatedProg,
        slug: slugify(updatedProg.slug),
        saleSlug: slugify(updatedProg.saleSlug),
      };
      const result = await axios.put(
        process.env.REACT_APP_API +
          "/university/update-program/" +
          progToSubmit._id,
        progToSubmit,
        {
          headers: {
            authToken: token,
          },
        }
      );
      if (result.data.err) {
        toast.error(result.data.err);
      } else {
        toast.success("Update saved!!!");
        navigate("/myprogram/edit/" + slugify(updatedProg.slug));
      }
    } else {
      toast.error("Sorry! You are not the owner of that program.");
      navigate("/myprograms");
    }
  };

  const tabData = [
    { key: 1, title: "Program Details" },
    { key: 2, title: "Prices & Packages" },
    { key: 3, title: "Sales Page" },
  ];

  return (
    <Layout>
      <MainHeader
        defaultKey="4"
        dashboard={dashboard}
        setDashboard={setDashboard}
      />
      <div
        style={{
          padding: 24,
          backgroundColor: "#ffffff",
          marginTop: 10,
        }}
      >
        <Navigator
          tabMenu={tabMenu}
          setTabMenu={setTabMenu}
          tabData={tabData}
          width={150}
        />

        {program._id && tabMenu === 1 && (
          <ProgDetails
            program={program}
            setProgram={setProgram}
            handleSubmit={handleSubmit}
          />
        )}

        {program._id && tabMenu === 2 && (
          <Packages
            program={program}
            setProgram={setProgram}
            handleSubmit={handleSubmit}
          />
        )}

        {program._id && tabMenu === 3 && <SalesPage program={program} />}
      </div>
      <MainFooter />
    </Layout>
  );
};

export default EditProgram;
