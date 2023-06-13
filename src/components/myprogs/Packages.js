import React from "react";
import { Button } from "antd";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";

import PackageCard from "../card/PackageCard";

const initialState = {
  name: "",
  price: "",
  discountPrice: "",
  commission1: "",
  commission2: "",
  commission3: "",
  currency: "PHP",
};

const Packages = ({ program, setProgram, handleSubmit }) => {
  const onFinish = (values) => {
    const newPackages =
      program.packages &&
      program.packages.map((pack) => {
        if (pack._id === values._id) return values;
        else return pack;
      });
    setProgram({ ...program, packages: newPackages });
    handleSubmit({ ...program, packages: newPackages });
  };

  const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map((field) => {
      return toast.error(field.errors[0]);
    });
  };

  const handleChangeCurrency = (packid, value) => {
    const newPackages =
      program.packages &&
      program.packages.map((pack) => {
        if (pack._id === packid) return { ...pack, currency: value };
        else return pack;
      });
    setProgram({ ...program, packages: newPackages });
  };

  const handleDeletePackage = (packid) => {
    const newPackages =
      program.packages &&
      program.packages.filter((pack) => pack._id !== packid);
    setProgram({ ...program, packages: newPackages });
    handleSubmit({ ...program, packages: newPackages });
  };

  return (
    <div align="center" style={{ padding: 40 }}>
      {program.packages &&
        program.packages.map((pack) => (
          <PackageCard
            key={pack._id}
            pack={pack}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            handleChangeCurrency={handleChangeCurrency}
            handleDeletePackage={handleDeletePackage}
          />
        ))}
      <Button
        danger
        style={{
          width: isMobile ? "100%" : 350,
          height: isMobile ? 50 : 60,
          fontSize: isMobile ? 18 : 24,
          marginTop: 30,
        }}
        onClick={() => {
          setProgram({
            ...program,
            packages: program.packages
              ? [...program.packages, initialState]
              : [initialState],
          });
        }}
      >
        + Add Package
      </Button>
    </div>
  );
};

export default Packages;
