import React from 'react'
import { Button, Form, Input } from 'antd';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterExist = ({setPremium}) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));

    // useEffect(() => {
    //     const localUser = JSON.parse(localStorage.getItem("programUser"));
    //     if (!localUser && !sessionUser) {
    //         navigate("/login");
    //     } else {
    //         if (localUser) {
    //             sessionStorage.setItem("programUser", JSON.stringify(localUser))
    //         }
    //     }
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onFinish = async (values) => {
        const { email, password, estoreid } = values;

        const token = await axios.post(
            process.env.REACT_APP_API + "/existuser-authtoken",
                { email, phone: "", password },
                {
                    headers: {
                        estoreid,
                    },
                }
        );

        if (token.data.err) {
          toast.error(token.data.err);
        } else {
          if (token.data.noPass) {
            toast.error(token.data.noPass);
          }else{
            const user = await axios.post(
                process.env.REACT_APP_API + "/current-user",
                    {},
                    {
                        headers: {
                            authToken: token.data,
                            estoreid,
                        },
                    }
            );
            
            if (user.data.premiumProgUsed) {
                toast.error("Sorry, but your Clavstore Website is already assigned to one of our Clavstore Program User.");
            } else {
                if (user.data.role === "admin") {
                    setPremium(true);
                    const updateUser = await axios.post(
                        process.env.REACT_APP_API + "/create-or-update-user",
                        { values: {premiumProgUsed: true} },
                        {
                            headers: {
                                authToken: token.data,
                                estoreid,
                            },
                        }
                    );
                    if (updateUser) {
                        sessionStorage.setItem("programUser", JSON.stringify({ ...sessionUser, premiumProgUsed: true }));
                        localStorage.setItem("programUser", JSON.stringify({ ...sessionUser, premiumProgUsed: true }));
                        await axios.post(
                            process.env.REACT_APP_API + "/ogt/update-user",
                                { email: sessionUser.email, premiumProgUsed: true },
                                {
                                    headers: {
                                        authToken: token.data,
                                        estoreid,
                                    },
                                }
                        );
                    }
                } else {
                    toast.error("Sorry, only admin of this Clavstore Website are allowed for this feature.")
                }
            }
          }
        }

    };
    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };
    return ( 
        <>
            <div
                style={{
                    maxWidth: 450,
                    marginTop: 20
                }}
            >
                <h6>
                    If you already have a Clavstore Website, you can upgrade to Premium for Free.
                    Go to your Admin Account then Manage Home and get your Website ID.
                    Copy it and paste it below together with your admin email and password.
                </h6><br />
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Website ID"
                        name="estoreid"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Clavstore ID!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Admin Email"
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
                        label="Admin Password"
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

                    <Form.Item
                        wrapperCol={{
                            offset: isMobile ? 0 : 5,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit Upgrade
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
     );
}
 
export default RegisterExist;