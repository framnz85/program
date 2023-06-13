import React from "react";
import { Button } from "antd";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

const Enrolled = ({ program, noRedirect }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          width: isMobile ? "100%" : "80%",
          marginTop: 20,
          color: "#00D100",
          fontSize: 28,
          border: "1px solid #00D100",
          borderRadius: 8,
          padding: 25,
        }}
      >
        You are already in enrolled in this program
      </div>
      <Button
        type="primary"
        size="large"
        style={{
          height: 70,
          fontSize: 24,
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: 25,
          width: isMobile ? "100%" : noRedirect ? "30%" : "80%",
        }}
        onClick={() => navigate("/access/" + program.slug)}
      >
        Access The Program
      </Button>
    </>
  );
};

export default Enrolled;
