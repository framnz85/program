import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const AddSalesTitle = ({
  values,
  setValues,
  addEditTitle,
  setAddEditTitle,
  program,
  fetchProgramQuill,
}) => {
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [deleteCode, setDeleteCode] = useState("");

  useEffect(() => {
    if (addEditTitle === 1) {
      setValues({});
    }
  }, [addEditTitle]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitSales = async () => {
    const updateSales = await axios.put(
      process.env.REACT_APP_API + "/university/update-sales/" + program._id,
      {
        saleid: values._id,
        title: values.title,
        salesPagesCount: values.salesPagesCount,
      },
      {
        headers: {
          authToken: token,
        },
      }
    );
    if (updateSales.data.err) {
      toast.error(updateSales.data.err);
      setAddEditTitle(0);
    } else {
      toast.success(
        `Sales Page successfully ${addEditTitle === 1 ? "added" : "updated"}`
      );
      fetchProgramQuill();
      setAddEditTitle(0);
    }
  };

  const submitDelete = async () => {
    if (deleteCode !== values._id.slice(-3)) {
      toast.error("Sorry, your enter a wrong code");
    } else {
      const deleteSales = await axios.delete(
        process.env.REACT_APP_API +
          "/university/delete-sales/" +
          program._id +
          "/" +
          values._id,
        {
          headers: {
            authToken: token,
          },
        }
      );
      if (deleteSales.data.err) {
        toast.error(deleteSales.data.err);
        setAddEditTitle(0);
      } else {
        toast.error(values.title + " has been successfully deleted");
        const deleteFiles = await axios.post(
          process.env.REACT_APP_CLAVMALL_IMG +
            "/program_function/delfile.php?progid=" +
            program._id +
            "&saleid=" +
            values._id
        );
        if (deleteFiles.data.err) {
          toast.error(deleteFiles.data.err);
          setAddEditTitle(0);
        } else {
          fetchProgramQuill();
          setAddEditTitle(0);
        }
      }
    }
  };

  return (
    <Modal
      title={
        addEditTitle === 1
          ? "Add Sales Page"
          : addEditTitle === 2
          ? "Edit Sales Page"
          : "Delete Sales Page"
      }
      open={addEditTitle !== 0}
      onOk={() => (addEditTitle === 3 ? submitDelete() : submitSales())}
      onCancel={() => setAddEditTitle(0)}
      okText={
        addEditTitle === 1 ? "+ Add" : addEditTitle === 2 ? "Change" : "Delete"
      }
    >
      <br />

      {addEditTitle === 3 ? (
        <>
          Place this character "{values._id.slice(-3)}" below to delete.
          <br />
          <Input onChange={(e) => setDeleteCode(e.target.value)} />
        </>
      ) : (
        <Input
          placeholder="Title"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
        />
      )}
      <br />
      <br />
    </Modal>
  );
};

export default AddSalesTitle;
