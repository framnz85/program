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
    saleid: "",
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
    setLoading(true);
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
            saleid: result.data._id ? result.data._id : "",
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

  const copySalesTemp = async (saleid) => {
    const result = await axios.put(
      process.env.REACT_APP_API +
        "/university/update-copysales/" +
        saleid +
        "/" +
        values.progid,
      {},
      {
        headers: {
          authToken: token,
        },
      }
    );
    if (result.data.err) {
      setLoading(false);
      toast.error(result.data.err);
    } else {
      setLoading(false);
      toast.success("Update saved!!!");
    }
  };

  const submitSales = async (saleid, pages, index, errors) => {
    setLoading(true);
    const result = await axios.put(
      process.env.REACT_APP_API + "/university/update-sales/" + values.progid,
      {
        saleid,
        salesPage: pages[index],
        index: parseInt(index + 1),
      },
      {
        headers: {
          authToken: token,
        },
      }
    );
    if (result.data.err) {
      errors.push(result.data.err);
      toast.error(result.data.err);
      setLoading(false);
    } else if (result) {
      if (result.data.saleid) {
        saleid = result.data.saleid;
        setValues({
          ...values,
          saleid,
        });
      }
      if (pages.length > parseInt(index + 1)) {
        submitSales(saleid, pages, ++index, errors);
      } else {
        quill.enable();
        if (errors.length > 0) {
          toast.error(errors[0]);
        } else {
          copySalesTemp(saleid);
        }
        setLoading(false);
      }
    } else {
      toast.success("Something failed!");
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (sessionUser._id === values.owner) {
      let errors = [];
      if (salesPages.length > 0) {
        quill.disable();
        setLoading(true);
        submitSales(values.saleid, salesPages, 0, errors);
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
