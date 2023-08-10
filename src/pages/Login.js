import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { isMobile } from "react-device-detect";

const ClavstoreUniversity =
  process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathToRedirect = location && location.state && location.state.from;

  const onFinish = async (values) => {
    const token = await axios.get(
      process.env.REACT_APP_API +
        "/university/generate-token/" +
        values.email.toLowerCase() +
        "/" +
        values.password
    );
    if (token) {
      const user = await axios.get(
        process.env.REACT_APP_API + "/university/login-user",
        {
          headers: {
            authToken: token.data,
          },
        }
      );

      if (user && user.data.err) {
        toast.error(user.data.err);
      } else {
        sessionStorage.setItem("programUser", JSON.stringify(user.data));
        sessionStorage.setItem("token", token.data);
        if (values.remember) {
          localStorage.setItem("token", token.data);
        }
        if (pathToRedirect) {
          navigate(pathToRedirect, { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map((field) => {
      return toast.error(field.errors[0]);
    });
  };

  return (
    <div align="center" style={{ padding: 20 }}>
      <div
        style={{
          marginTop: isMobile ? "20px" : "80px",
          color: "#009A57",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <div>
          <img
            src={ClavstoreUniversity}
            alt="Clavstore University"
            style={{
              marginRight: 20,
              width: 80,
              height: 80,
              borderRadius: 6,
            }}
          />
        </div>
        <h2
          style={{
            fontSize: isMobile ? "24px" : "32px",
            paddingTop: isMobile ? 25 : 15,
          }}
        >
          Clavstore University
        </h2>
      </div>
      <div
        align="left"
        style={{
          maxWidth: 450,
          marginTop: 50,
        }}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input style={{ padding: isMobile ? 10 : 6 }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              () => ({
                validator(_, value) {
                  if (value.length > 7) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Password must be at least 8 characters")
                  );
                },
              }),
            ]}
          >
            <Input.Password style={{ padding: isMobile ? 10 : 6 }} />
          </Form.Item>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "80% 20%" : "70% 30%",
              paddingLeft: isMobile ? 0 : 115,
            }}
          >
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link
              to="/register"
              state={{ from: pathToRedirect ? pathToRedirect : "/home" }}
              style={{ paddingTop: 5 }}
            >
              Register
            </Link>
          </div>

          <Form.Item
            wrapperCol={{
              offset: isMobile ? 0 : 6,
              span: 16,
            }}
          >
            <Button
              type="primary"
              size="large"
              style={{
                width: "100%",
              }}
              htmlType="submit"
            >
              Login
            </Button>
            <div align="center" style={{ marginTop: 20 }}>
              <Link to="/recovery">Forgot Password?</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
