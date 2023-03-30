import React from 'react'
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const RecoverCode = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);

    const onFinish = async (values) => {
        const updateUser = await axios.put(
            process.env.REACT_APP_API + "/university/recover-password",
                { email: values.email.toLowerCase(), recovery: values.recovery.trim(), password: values.password },
        );
        if (updateUser.data.err) {
            toast.error(updateUser.data.err);
        } else {
            sessionStorage.setItem("programUser", JSON.stringify(updateUser.data));
            navigate("/home");
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };
    
    return ( 
        <div align="center" style={{padding: 20}}>
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
                <h2 style={{fontSize: isMobile ? "24px" : "32px", paddingTop: isMobile ? 25 : 15}}>Clavstore University</h2>
            </div>
            <div align="center"
                style={{
                    maxWidth: 450,
                    marginTop: 50
                }}
            >
                <p>Password Recovery</p>
                {queryParams.get("success")
                    ? <p style={{color: "red"}}>Get the Recovery Code we sent you on your email address. Place it below and create your new password.</p>
                    : <p style={{color: "red"}}>Place your Recovery Code below to create new password</p>
                }<br />
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    labelCol={{
                        span: 8,
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
                                message: 'Please input your email!',
                            },
                            {
                                type: "email",
                                message: 'The input is not valid E-mail!',
                            },
                        ]}
                    >
                        <Input style={{padding: isMobile ? 10 : 6}} />
                    </Form.Item>

                    <Form.Item
                        label="Recovery Code"
                        name="recovery"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your recovery code!',
                            },
                        ]}
                    >
                        <Input style={{padding: isMobile ? 10 : 6}} />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your password!',
                            },
                            () => ({
                                validator(_, value) {
                                    if (value && value.length > 7) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password must be at least 8 characters'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{padding: isMobile ? 10 : 6}} />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="repassword"
                        dependencies={['password']}
                        rules={[
                            {
                            required: true,
                            message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password style={{padding: isMobile ? 10 : 6}} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: isMobile ? 0 : 8,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                width: "100%"
                            }}
                            htmlType="submit"
                        >
                            Recovery Submit
                        </Button>
                        <div align="center" style={{marginTop: 20}}>
                            <Link to="/recovery">I don't have Recovery Code</Link>
                        </div>
                        <div align="center" style={{marginTop: 20}}>
                            <Link to="/login">Back To Login</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
     );
}
 
export default RecoverCode;