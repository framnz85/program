import React, {useState, useEffect} from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const Register = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    
    const [refid, setRefid] = useState("");

    const onFinish = async (values) => {
        const remember = values.remember;

        delete values.remember;
        delete values.repassword;

        if (refid !== "null") {
            values={...values, refid}
        }

        const user = await axios.post(process.env.REACT_APP_API + "/ogt", values);

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

    useEffect(() => {
        if (!localStorage.getItem("refid")) {
            const isRefid = queryParams.get("refid");
            if (isRefid) {
                localStorage.setItem("refid", isRefid);
            }
        } else {
            setRefid(localStorage.getItem("refid"));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return ( 
        <div align="center" style={{padding: 20}}>
            <h2 style={{
                marginTop: "80px",
                color: "#009A57"
            }}
            >
                Free Clavstore Register
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
                        label="Full Name"
                        name="name"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

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
                                    if (value && value.length > 7) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password must be at least 8 characters'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
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

                        <Link to="/login" style={{paddingTop: 5}}>Login Now</Link>
                    </div>

                    <Form.Item
                        wrapperCol={{
                            offset: isMobile ? 0 : 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
     );
}
 
export default Register;