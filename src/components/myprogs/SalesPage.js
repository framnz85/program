import React, { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { useQuill } from "react-quilljs";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  LoadingOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import AddSalesTitle from "../modal/AddSalesTitle";

const SalesPage = ({ program }) => {
  const navigate = useNavigate();
  const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
  const { quill, quillRef } = useQuill();
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [values, setValues] = useState({});
  const [selectPages, setSelectPages] = useState([]);
  const [salesPages, setSalesPages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addEditTitle, setAddEditTitle] = useState(0);

  useEffect(() => {
    if (quill) {
      fetchProgramQuill();
    }
  }, [quill]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProgramQuill = async () => {
    setLoading(true);
    const progSalePages = await axios.get(
      process.env.REACT_APP_API + "/university/program-sales/" + program._id
    );
    if (progSalePages.data.err) {
      toast.error(progSalePages.data.err);
    } else {
      if (progSalePages.data.length > 0) {
        setSelectPages(
          progSalePages.data.map((sale) => {
            return { ...sale, value: sale._id, label: sale.title };
          })
        );
        setLoading(false);
        loadProgramQuill(progSalePages.data[0]);
      } else {
        setLoading(false);
      }
    }
  };

  const loadProgramQuill = async (progSalePage) => {
    const salesPageArray = [];
    setSalesPages([]);
    quill.clipboard.dangerouslyPasteHTML("");
    if (progSalePage) {
      if (sessionUser._id === program.owner) {
        setValues({
          ...values,
          ...progSalePage,
        });
        for (let i = 0; i <= progSalePage.salesPagesCount; i++) {
          const result = await axios.get(
            process.env.REACT_APP_CLAVMALL_IMG +
              "/program_function/getfile.php?progid=" +
              program._id +
              "&saleid=" +
              progSalePage._id +
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
    if (copySales.data.err) {
      quill.enable();
      setLoading(false);
      toast.error(copySales.data.err);
    } else {
      quill.enable();
      setLoading(false);
      toast.success("Update saved!!!");

      await axios.put(
        process.env.REACT_APP_API + "/university/update-program/" + program._id,
        { salesPage: "update" },
        {
          headers: {
            authToken: token,
          },
        }
      );
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

  const submitSales = async (saleid, title, pages) => {
    const updateSales = await axios.put(
      process.env.REACT_APP_API + "/university/update-sales/" + program._id,
      {
        saleid,
        title,
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
    if (sessionUser._id === program.owner) {
      if (values._id && values.title && salesPages.length > 0) {
        quill.disable();
        setLoading(true);
        submitSales(values._id, values.title, salesPages);
      } else {
        setAddEditTitle(1);
      }
    } else {
      toast.error("Sorry! You are not the owner of that program.");
      navigate("/myprograms");
    }
  };

  const handleChange = (value) => {
    if (value === "add") {
      setAddEditTitle(1);
    } else {
      const selectedPage = selectPages.find((page) => page._id === value);
      loadProgramQuill(selectedPage);
    }
  };

  return (
    <div align="center">
      <span>Select Sales Page: </span>{" "}
      <Select
        defaultValue={selectPages[0]}
        style={{
          width: 320,
          marginTop: 10,
        }}
        onChange={handleChange}
        options={[...selectPages, { value: "add", label: "+ Add Sales Page" }]}
      />{" "}
      <FormOutlined
        style={{ fontSize: 18, margin: "0 5px", cursor: "pointer" }}
        onClick={() => setAddEditTitle(2)}
      />
      <DeleteOutlined
        style={{
          fontSize: 18,
          margin: "0 5px",
          cursor: "pointer",
          color: "red",
        }}
        onClick={() => setAddEditTitle(3)}
      />
      <div
        style={{
          width: isMobile ? "100%" : "80%",
          marginBottom: 600,
          marginTop: 10,
        }}
      >
        <div
          ref={quillRef}
          style={{
            width: isMobile ? "87%" : "78%",
            position: "absolute",
            height: 600,
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
            `/${program.saleSlug ? "p/" + program.saleSlug : ""}/?saleid=${
              values._id
            }&refid=${sessionUser._id}`,
            "_blank",
            "noreferrer"
          )
        }
      >
        View Sales Page
      </Button>
      <AddSalesTitle
        values={values}
        setValues={setValues}
        addEditTitle={addEditTitle}
        setAddEditTitle={setAddEditTitle}
        program={program}
        fetchProgramQuill={fetchProgramQuill}
      />
    </div>
  );
};

export default SalesPage;
