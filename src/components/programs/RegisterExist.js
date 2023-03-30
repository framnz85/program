import React from 'react'
import { Button, Form, Input } from 'antd';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterExist = ({program, user, setUser, payment, setIsModalOpen}) => {
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

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
                        updateUserProgram();
                    }
                } else {
                    toast.error("Sorry, only admin of this Clavstore Website are allowed for this feature.")
                }
            }
          }
        }

    };

    const updateUserProgram = async () => {
        const programList = user.programList ? user.programList : [];
            
        programList.push({
            progid: program._id,
            amount: program.discountPrice === "Free" ? 0 : parseFloat(program.discountPrice),
            payment,
            status: true,
            steps: 1,
        });

        const updateUser = await axios.put(
            process.env.REACT_APP_API + "/university/update-user",
            { programList },
            {
                headers: {
                    authToken: token,
                },
            }
        );
        if (updateUser.data.err) {
            toast.error(updateUser.data.err);
        } else {
            sessionStorage.setItem("programUser", JSON.stringify(updateUser.data));
            setUser(updateUser.data);
        }
        setIsModalOpen(false);
    };

    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };
    return ( 
        <div>
            <div
                align="center"
                style={{
                    maxWidth: 720,
                    marginTop: 30
                }}
            >
                <h4>Enrolled Already?</h4>
                <p style={{color: "red"}}>
                    If you are already enrolled to OGAP Program and have a a Grocery Website, you are automatically enrolled in this program.
                    Go back to your Grocery Website and go to your "Admin Account". Proceed to "Manage Home" and get your "Website ID".
                    Copy it and paste it below together with your Admins' Email Address and Password.
                </p><br />
                <Form
                    name="basic"
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
        </div>
     );
}
 
export default RegisterExist;