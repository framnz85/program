import React, {useState} from 'react'
import { Button, Form, Input } from 'antd';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Security = () => {
    const navigate = useNavigate();
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [userProfile, setUserProfile] = useState(sessionUser);

    const onFinish = async(values) => {
        const updateUser = await axios.put(
            process.env.REACT_APP_API + "/university/change-password",
            values,
            {
                headers: {
                    authToken: token,
                },
            }
        );
        if (updateUser.data.err) {
            toast.error(updateUser.data.err);
        } else {
            sessionStorage.setItem("programUser", JSON.stringify({ ...sessionUser, ...values }));
            setUserProfile({ ...sessionUser, ...values });
            toast.success("Password successfully updated!");
            localStorage.clear();
            sessionStorage.clear();
            navigate("/login");
        } 
    };

    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };

    return ( 
        <div align="center" style={{padding: isMobile ? 10 : 40}}>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                values={userProfile}
            >
                <Form.Item
                    label="Old Password"
                    name="oldpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                        () => ({
                            validator(_, value) {
                                if (value && value.length > 7) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('New Password must be at least 8 characters'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Re-type Password"
                    name="repassword"
                    dependencies={['newpassword']}
                    rules={[
                        {
                        required: true,
                        message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newpassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: isMobile ? 0 : 6,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: isMobile ? "100%" : 250,
                            height: isMobile ? 40 : 50,
                            fontSize: isMobile ? 16 : 20,
                            marginTop: 30
                        }}
                    >
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
     );
}
 
export default Security;