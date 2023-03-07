import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const remember = values.remember;

        delete values.remember;

        const user = await axios.get(
            process.env.REACT_APP_API + "/ogt/" + values.email + "/" + values.password
        );

        if (user && user.data.err) {
            toast.error(user.data.err);
        }else{
            sessionStorage.setItem("programUser", JSON.stringify(user.data));
    
            if (remember) {
                localStorage.setItem("programUser", JSON.stringify(user.data));
            }
    
            navigate("/");
        }

    };
    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };
    
    return ( 
        <div align="center" style={{padding: 20}}>
            <h2 style={{
                marginTop: "80px",
                color: "#009A57"
            }}
            >
                Free Clavstore Login
            </h2>
            <div align="left"
                style={{
                    maxWidth: 450,
                    marginTop: 50
                }}
            >
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
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your password!',
                            },
                            () => ({
                                validator(_, value) {
                                    if (value.length > 7) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password must be at least 8 characters'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "70% 30%",
                        paddingLeft: isMobile ? 0 : 150
                    }}>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Link to="/register" style={{paddingTop: 5}}>Register</Link>
                    </div>

                    <Form.Item
                        wrapperCol={{
                            offset: isMobile ? 0 : 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
     );
}
 
export default Login;