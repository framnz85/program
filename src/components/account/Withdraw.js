import React, {useState} from 'react'
import { Input, Select, Form, Button } from 'antd';
import Joi from "joi-browser";
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';

const Withdraw = ({dashboard, popup = false}) => {
    const [loading, setLoading] = useState(false);

    const schema = {
        bank: Joi.string().min(2).max(32).required(),
        accountNumber: Joi.string().min(2).max(32).required(),
        accountName: Joi.string().min(2).max(32).required(),
        amount: Joi.number().integer().min(30000).max(dashboard.totalRemaining).required(),
    };

    const onFinish = (values) => {
        if (!loading) {
            const validate = Joi.validate(values, schema, {
                abortEarly: false,
            });

            console.log(validate)
    
            if (validate.error) {
                for (let item of validate.error.details) toast.error(item.message);
                return;
            }
            
            setLoading(true)
            // withdrawCommission(user, "Withdraw", {bank, accountNumber, accountName, withdrawAmount}, user.token).then(res => {
            //     loadAffiliates();
            //     setLoading(false);
            //     setIsModalOpen(false);
            // })
        }
    };

    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };

    return ( 
        <div align="center" style={{ padding: isMobile ? 10 : 20 }}>
            <p style={{color: "red"}}>Make your earnings to 30,000 pesos and then withdraw!</p>
            <br />
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
            >

                <Form.Item
                    label="Choose Bank"
                    name="bank"
                    rules={[
                        {
                        required: true,
                        message: 'Choose what bank we deposit your withdrawal',
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="gca" >Gcash</Select.Option>
                        <Select.Option value="bdo">BDO</Select.Option>
                        <Select.Option value="bpi">BPI</Select.Option>
                        <Select.Option value="uni">Unionbank</Select.Option>
                    </Select>
                </Form.Item>
                
                <Form.Item
                    label="Account Number"
                    name="accountNumber"
                    rules={[
                        {
                        required: true,
                        message: 'Place your Account Number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="Account Name"
                    name="accountName"
                    rules={[
                        {
                        required: true,
                        message: 'Place your Account Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                        required: true,
                        message: 'Place the amount you wish to withdrawn!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <div align="center" style={{marginLeft: (isMobile || popup) ? 0 : 100}}>
                    <p><b>Balance:</b> {dashboard.totalRemaining.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <b>Min. Amount:</b> 30,000.00</p>
                </div>

                <Form.Item
                    wrapperCol={{
                        offset: isMobile ? 0 : popup ? 4 : 6,
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
                        Submit Withdrawal
                    </Button>
                </Form.Item>
            </Form>
        </div>
     );
}
 
export default Withdraw;