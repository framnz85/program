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

  const [values, setValues] = useState({
    progid: program._id,
    owner: program.owner,
  });
  const [salesPages, setSalesPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quill) {
      fetchProgramQuill(quill);
    }
  }, [quill]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProgramQuill = async (quill) => {
    const result = await axios.get(
      process.env.REACT_APP_API + "/university/program-sales/" + program._id
    );
    if (result.data) {
      if (result.data.err) {
        toast.error(result.data.err);
      } else {
        if (sessionUser._id === program.owner) {
          setValues({
            ...values,
            progid: result.data.progid ? result.data.progid : "",
            owner: result.data.owner ? result.data.owner : program.owner,
          });
          setSalesPages(result.data.salesPage ? result.data.salesPage : []);
          const combineSalesPage = result.data.salesPage
            ? result.data.salesPage.join("")
            : "";
          quill.clipboard.dangerouslyPasteHTML(combineSalesPage);
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
    } else {
      quill.clipboard.dangerouslyPasteHTML("");
      quill.on("text-change", () => {
        setSalesPages(
          quillRef.current.firstChild.innerHTML.match(/.{1,500000}/g)
        );
      });
    }
  };

  const submitSales = (pages, index, errors) => {
    setTimeout(async () => {
      const result = await axios.put(
        process.env.REACT_APP_API +
          "/university/update-program/" +
          values.progid,
        { salesPage: pages[index], index: parseInt(index + 1) },
        {
          headers: {
            authToken: token,
          },
        }
      );
      if (result.data.err) {
        errors.push(result.data.err);
        toast.error(result.data.err);
      }
      if (pages.length > parseInt(index + 1)) {
        submitSales(pages, ++index, errors);
      } else {
        quill.enable();
        setLoading(false);
        if (errors.length > 0) {
          toast.error(errors[0]);
        } else {
          toast.success("Update saved!!!");
        }
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    if (sessionUser._id === values.owner) {
      let errors = [];
      if (salesPages.length > 0) {
        quill.disable();
        setLoading(true);
        submitSales(salesPages, 0, errors);
      }
    } else {
      toast.error("Sorry! You are not the owner of that program.");
      navigate("/myprograms");
    }
  };

  return (
    <div align="center">
      <Button
        type="default"
        size="large"
        style={{
          margin: 10,
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
      <div style={{ width: isMobile ? "100%" : "80%" }}>
        <div ref={quillRef} />
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
        style={{
          width: isMobile ? "100%" : 350,
          height: isMobile ? 50 : 60,
          fontSize: isMobile ? 18 : 24,
          marginTop: 30,
        }}
        onClick={() => handleSubmit()}
      >
        Update Sales Page
      </Button>
    </div>
  );
};

export default SalesPage;
