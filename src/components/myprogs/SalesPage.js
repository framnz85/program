import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useQuill } from "react-quilljs";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const SalesPage = ({ program }) => {
  const navigate = useNavigate();
  const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
  const { quill, quillRef } = useQuill();
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [values, setValues] = useState({});
  const [salesPages, setSalesPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quill) {
      fetchProgramQuill(quill);
    }
  }, [quill]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProgramQuill = async (quill) => {
    const salesPageArray = [];
    setLoading(true);
    const salesPage = await axios.get(
      process.env.REACT_APP_API + "/university/program-sales/" + program._id
    );
    if (salesPage.data) {
      if (salesPage.data.err) {
        toast.error(salesPage.data.err);
      } else {
        if (sessionUser._id === program.owner) {
          setValues({
            ...values,
            ...salesPage.data,
          });
          for (let i = 0; i <= salesPage.data.salesPagesCount; i++) {
            const result = await axios.get(
              process.env.REACT_APP_CLAVMALL_IMG +
                "/program_function/getfile.php?progid=" +
                program._id +
                "&saleid=" +
                salesPage.data._id +
                "&index=" +
                i
            );
            if (result.data.text) {
              salesPageArray[i] = result.data.text;
              setSalesPages(salesPageArray);
              quill.clipboard.dangerouslyPasteHTML(salesPageArray.join(""));
            }
          }
          quill.on("text-change", () => {
            setSalesPages(
              quillRef.current.firstChild.innerHTML.match(/.{1,500000}/g)
            );
          });
        } else {
          toast.error("Sorry! You are not the owner of that program.");
          navigate("/myprograms");
        }
      }
      setLoading(false);
    } else {
      quill.clipboard.dangerouslyPasteHTML("");
      quill.on("text-change", () => {
        setSalesPages(
          quillRef.current.firstChild.innerHTML.match(/.{1,500000}/g)
        );
      });
      setLoading(false);
    }
  };

  const copySalesTemp = async (updateSales) => {
    const copySales = await axios.post(
      process.env.REACT_APP_CLAVMALL_IMG +
        "/program_function/setfile.php?progid=" +
        program._id +
        "&saleid=" +
        updateSales._id
    );
    console.log(copySales.data);
    if (copySales.data.err) {
      quill.enable();
      setLoading(false);
      toast.error(copySales.data.err);
    } else {
      quill.enable();
      setLoading(false);
      toast.success("Update saved!!!");
    }
  };

  const createSalesTemp = async (updateSales, pages) => {
    const emptyTemp = await axios.post(
      process.env.REACT_APP_CLAVMALL_IMG +
        "/program_function/deltemp.php?progid=" +
        program._id +
        "&saleid=" +
        updateSales._id
    );
    if (emptyTemp.data.err) {
      toast.error(emptyTemp.data.err);
      quill.enable();
      setLoading(false);
    } else {
      for (let i = 0; i <= updateSales.salesPagesCount; i++) {
        await axios.post(
          process.env.REACT_APP_CLAVMALL_IMG +
            "/program_function/settemp.php?progid=" +
            program._id +
            "&saleid=" +
            updateSales._id +
            "&index=" +
            i,
          { page: pages[i] }
        );
      }
      copySalesTemp(updateSales);
    }
  };

  const submitSales = async (saleid, pages) => {
    const updateSales = await axios.put(
      process.env.REACT_APP_API + "/university/update-sales/" + values.progid,
      {
        saleid,
        salesPagesCount: pages.length - 1,
      },
      {
        headers: {
          authToken: token,
        },
      }
    );
    if (updateSales.data.err) {
      toast.error(updateSales.data.err);
      quill.enable();
      setLoading(false);
    } else {
      createSalesTemp(updateSales.data, pages);
    }
  };

  const handleSubmit = async () => {
    if (sessionUser._id === values.owner) {
      if (salesPages.length > 0) {
        quill.disable();
        setLoading(true);
        submitSales(values.saleid, salesPages);
      }
    } else {
      toast.error("Sorry! You are not the owner of that program.");
      navigate("/myprograms");
    }
  };

  return (
    <div align="center">
      <div
        style={{
          width: isMobile ? "100%" : "80%",
          marginBottom: 630,
          marginTop: 10,
        }}
      >
        <div
          ref={quillRef}
          style={{
            width: isMobile ? "87%" : "78%",
            position: "absolute",
            height: 630,
          }}
        />
      </div>
      {loading && (
        <>
          <br />
          <LoadingOutlined style={{ fontSize: 24 }} />
          <br />
        </>
      )}
      <Button
        type="primary"
        size="large"
        style={{
          margin: "10px 5px",
        }}
        onClick={() => handleSubmit()}
        disabled={loading}
      >
        Submit Update
      </Button>
      <Button
        type="default"
        size="large"
        style={{
          margin: "10px 5px",
        }}
        onClick={() =>
          window.open(
            `/${program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${
              sessionUser._id
            }`,
            "_blank",
            "noreferrer"
          )
        }
      >
        View Sales Page
      </Button>
    </div>
  );
};

export default SalesPage;
