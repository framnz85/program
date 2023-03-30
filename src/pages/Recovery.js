import React from 'react'
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const Recovery = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const updateUser = await axios.put(
            process.env.REACT_APP_API + "/university/recover-password",
                { email: values.email.toLowerCase() },
        );
        if (updateUser.data.err) {
            toast.error(updateUser.data.err);
        } else {
            navigate(`/recoverform?name=${updateUser.data && updateUser.data.name}&email=${updateUser.data && updateUser.data.email}&rc=${updateUser.data && updateUser.data.recovery}`);
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
                <p>Password Recovery (Enter Email)</p><br />
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
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
                        wrapperCol={{
                            offset: isMobile ? 0 : 4,
                            span: 20,
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
                            <Link to="/recovercode">I have a Recovery Code</Link>
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
 
export default Recovery;