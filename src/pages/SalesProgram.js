import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { isMobile } from "react-device-detect";

const SalesProgram = ({ setShowTab }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }
  const salesPageArray = [];

  const refid = queryParams.get("refid");

  if (
    !localStorage.getItem("refid") ||
    localStorage.getItem("refid") === "null"
  ) {
    localStorage.setItem("refid", refid);
  }

  const [salesPage, setSalesPage] = useState([]);
  const [program, setProgram] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProgram();
    setShowTab(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProgram = async () => {
    setLoading(true);
    const program = await axios.get(
      process.env.REACT_APP_API + "/university/program/" + slug
    );
    if (program.data.err) {
      toast.error(program.data.err);
    } else {
      setProgram(program.data);
      fetchProgramSales(program.data._id);
    }
  };

  const fetchProgramSales = async (progid) => {
    const salesPageArray = [];
    const salesPage = await axios.get(
      process.env.REACT_APP_API + "/university/program-sales/" + progid
    );
    if (salesPage.data.err) {
      toast.error(salesPage.data.err);
    } else {
      for (let i = 0; i <= salesPage.data.salesPagesCount; i++) {
        const result = await axios.get(
          process.env.REACT_APP_CLAVMALL_IMG +
            "/program_function/getfile.php?progid=" +
            progid +
            "&saleid=" +
            salesPage.data._id +
            "&index=" +
            i
        );
        salesPageArray[i] = result.data.text;
        setSalesPage(salesPageArray.join(""));
      }
      setLoading(false);
    }
  };

  return (
    <div align="center" style={{ height: 1200 }}>
      <div style={{ width: isMobile ? "100%" : "80%", padding: 20 }}>
        <ReactQuill
          value={salesPage ? salesPage : ""}
          readOnly={true}
          modules={{ toolbar: [] }}
        />
      </div>
      <Button
        type="primary"
        size="large"
        style={{
          height: isMobile ? 50 : 70,
          fontSize: isMobile ? 20 : 24,
          paddingLeft: 40,
          paddingRight: 40,
          marginBottom: 50,
          width: isMobile ? "90%" : "50%",
        }}
        onClick={() => navigate("../program/" + program.slug + "?noRedirect=1")}
      >
        {loading ? (
          <>Loading Content...</>
        ) : (
          <>Click Here To Avail The Program</>
        )}
      </Button>
      <br />
    </div>
  );
};

export default SalesProgram;
