import React, {useState, useEffect} from 'react'
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { isMobile } from 'react-device-detect';

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const Register = ({regFromProg = false, pathname = ""}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathToRedirect = pathname && pathname.length > 0 ? pathname : location && location.state ? location.state.from : "";
    const queryParams = new URLSearchParams(window.location.search);
    const initRefid = "63fa250056d101375f142fe3";
    
    const [refid, setRefid] = useState(initRefid);

    const onFinish = async (values) => {
        delete values.remember;
        delete values.repassword;

        if (refid !== "null") {
            values={...values, refid}
        }

        const token = await axios.get(process.env.REACT_APP_API + "/university/generate-token/" + values.email.toLowerCase() + "/" + values.password)

        if (token) {
            const recovery = generateCode(8);
    
            const user = await axios.post(process.env.REACT_APP_API + "/university/add-user", {
                name: values.name,
                recovery,
                confirmed: false,
                refid: refid !== "null" ? refid : initRefid
            }, {
                headers: {
                    authToken: token.data,
                },
            });
    
            if (user && user.data.err) {
                toast.error(user.data.err);
                if(user.data.exist){
                    navigate("/login", {state: { from: pathToRedirect && pathToRedirect.length > 0 ? pathToRedirect : "/home" }});
                }
            } else {
                sessionStorage.setItem("programUser", JSON.stringify(user.data));
                localStorage.setItem("token", token.data);
                sessionStorage.setItem("token", token.data);
                if (regFromProg) {
                    window.location.reload();
                } else {
                    navigate("/home");
                }
            }
        } else {
            toast.error("No token has produced.");
        }
    };

    const generateCode = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    
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
            if (localStorage.getItem("refid") !== "null") {
                setRefid(localStorage.getItem("refid"));
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return ( 
        <div align="center" style={{padding: 20}}>
            <div
                style={{
                    marginTop: regFromProg || isMobile ? "20px" : "80px",
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
                        <Input style={{padding: isMobile ? 10 : 6}} />
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
                        <Input style={{padding: isMobile ? 10 : 6}} />
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

                    {refid && refid !== "null" && <Form.Item
                        label="Referred By"
                    >
                        {refid}
                    </Form.Item>}

                    <div align="right">
                        <Link to="/login" state={{ from: pathToRedirect && pathToRedirect.length > 0 ? pathToRedirect : "/home" }} style={{paddingTop: 5}}>Login Now</Link><br /><br />
                    </div>

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
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
     );
}
 
export default Register;