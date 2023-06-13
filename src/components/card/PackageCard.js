import React from "react";
import { Button, Form, Input, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";

import { currency } from "../common/currency";

const PackageCard = ({
  pack,
  onFinish,
  onFinishFailed,
  handleChangeCurrency,
  handleDeletePackage,
}) => {
  return (
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
        _id: pack._id,
        name: pack.name,
        commission1: pack.commission1,
        commission2: pack.commission2,
        commission3: pack.commission3,
        currency: pack.currency,
        price: pack.price,
        discountPrice: pack.discountPrice,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      values={pack}
    >
      <Form.Item label="Package ID" name="_id" style={{ display: "none" }}>
        <Input disabled={true} />
      </Form.Item>
      <Form.Item
        label="Package Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your Package Name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Currency"
        name="currency"
        rules={[
          {
            required: true,
            message: "Please choose your Currency!",
          },
        ]}
      >
        <Select
          style={{ textAlign: "left" }}
          onChange={(value) => handleChangeCurrency(pack._id, value)}
        >
          {currency.map((cur) => (
            <Select.Option key={cur.key} value={cur.currency}>
              {cur.currency}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Regular Price"
        name="price"
        rules={[
          {
            required: true,
            message: "Please input your Regular Price!",
          },
        ]}
      >
        <Input addonBefore={pack.currency} />
      </Form.Item>
      <Form.Item
        label="Discounted Price"
        name="discountPrice"
        rules={[
          {
            required: true,
            message: "Please input your Discounted Price!",
          },
        ]}
      >
        <Input addonBefore={pack.currency} />
      </Form.Item>
      <Form.Item
        label="Free Commission"
        name="commission1"
        rules={[
          {
            required: true,
            message: "Please input your Free Commission!",
          },
        ]}
      >
        <Input addonBefore={pack.currency} />
      </Form.Item>
      <Form.Item
        label="Premium Commission"
        name="commission2"
        rules={[
          {
            required: true,
            message: "Please input your Premium Commission!",
          },
        ]}
      >
        <Input addonBefore={pack.currency} />
      </Form.Item>
      <Form.Item
        label="Enrolled Commission"
        name="commission3"
        rules={[
          {
            required: true,
            message: "Please input your Enrolled Commission!",
          },
        ]}
      >
        <Input addonBefore={pack.currency} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: isMobile ? 0 : 5,
          span: 16,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: isMobile ? "70%" : 200,
            height: isMobile ? 40 : 50,
            fontSize: isMobile ? 16 : 20,
            marginBottom: 30,
            paddingBottom: 10,
          }}
        >
          Save Package
        </Button>
        <Button
          type="primary"
          danger
          style={{
            width: isMobile ? 40 : 50,
            height: isMobile ? 40 : 50,
            fontSize: isMobile ? 16 : 20,
            padding: 0,
            marginLeft: 5,
          }}
          onClick={() => handleDeletePackage(pack._id)}
        >
          <DeleteOutlined style={{ paddingBottom: 5 }} />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackageCard;
