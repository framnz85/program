import React, {useState} from 'react'
import { Button, Form, Input, Select } from 'antd';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { currency } from '../common/currency';

const Profile = () => {
    const navigate = useNavigate();
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [userProfile, setUserProfile] = useState(sessionUser);

    const onFinish = async(values) => {
        const updateUser = await axios.put(
            process.env.REACT_APP_API + "/university/update-user",
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
            toast.success("Profile successfully updated!");
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
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    name: userProfile.name,
                    email: userProfile.email,
                    currency: userProfile.currency ? userProfile.currency : "PHP"
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                values={userProfile}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Title!',
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
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your Currency!',
                        },
                    ]}
                >
                    <Select style={{ textAlign: "left" }}>
                        {currency.map(cur => <Select.Option key={cur.key} value={cur.currency}>{cur.currency}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: isMobile ? 0 : 8,
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
                        Update Profile
                    </Button>
                    <Button
                        type="default"
                        style={{
                            width: isMobile ? "100%" : 250,
                            height: isMobile ? 40 : 50,
                            fontSize: isMobile ? 16 : 20,
                            marginTop: 30
                        }}
                        onClick={() => {
                            localStorage.clear();
                            sessionStorage.clear();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Button>
                </Form.Item>
            </Form>
        </div>
     );
}
 
export default Profile;