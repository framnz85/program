import React from 'react'
import { Button, Form, Input, Select } from 'antd';
import { isMobile } from 'react-device-detect';
import slugify from 'react-slugify';
import { toast } from 'react-toastify';

import { currency } from '../common/currency';

const ProgDetails = ({program, setProgram, handleSubmit}) => {
    const onFinish = (values) => {
        setProgram({ ...program, ...values });
        handleSubmit({ ...program, ...values });
    };
    const onFinishFailed = (errorInfo) => {
        errorInfo.errorFields.map(field => {
            return toast.error(field.errors[0])
        })
    };
    
    return ( 
        <div align="center" style={{padding: 40}}>
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
                    title: program.title,
                    subtitle: program.subtitle,
                    description: program.description,
                    commission1: program.commission1,
                    commission2: program.commission2,
                    commission3: program.commission3,
                    currency: program.currency,
                    price: program.price,
                    discountPrice: program.discountPrice,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                values={program}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Title!',
                        },
                    ]}
                >
                    <Input
                        onChange={(e) => setProgram({
                            ...program,
                            slug: slugify(e.target.value),
                            saleSlug: slugify(e.target.value)
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Program Slug"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Program Slug!',
                        },
                    ]}
                >
                    <Input
                        value={program.slug}
                        onChange={(e) => setProgram({
                            ...program,
                            slug: e.target.value,
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Sales Slug"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Sales Slug!',
                        },
                    ]}
                >
                    <Input
                        value={program.saleSlug}
                        onChange={(e) => setProgram({
                            ...program,
                            saleSlug: e.target.value,
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Sub-Title"
                    name="subtitle"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Sub-Title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Description!',
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
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
                    <Select
                        style={{ textAlign: "left" }}
                        onChange={value => setProgram({
                            ...program,
                            currency: value,
                        })}
                    >
                        {currency.map(cur => <Select.Option key={cur.key} value={cur.currency}>{cur.currency}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Regular Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Regular Price!',
                        },
                    ]}
                >
                    <Input addonBefore={program.currency} />
                </Form.Item>
                <Form.Item
                    label="Discounted Price"
                    name="discountPrice"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Discounted Price!',
                        },
                    ]}
                >
                    <Input addonBefore={program.currency} />
                </Form.Item>
                <Form.Item
                    label="Free Commission"
                    name="commission1"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Free Commission!',
                        },
                    ]}
                >
                    <Input addonBefore={program.currency} />
                </Form.Item>
                <Form.Item
                    label="Premium Commission"
                    name="commission2"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Premium Commission!',
                        },
                    ]}
                >
                    <Input addonBefore={program.currency} />
                </Form.Item>
                <Form.Item
                    label="Enrolled Commission"
                    name="commission3"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Enrolled Commission!',
                        },
                    ]}
                >
                    <Input addonBefore={program.currency} />
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
                            width: isMobile ? "100%" : 350,
                            height: isMobile ? 50 : 60,
                            fontSize: isMobile ? 18 : 24,
                            marginTop: 30
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
     );
}
 
export default ProgDetails;