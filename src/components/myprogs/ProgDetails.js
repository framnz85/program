import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { isMobile } from "react-device-detect";
import slugify from "react-slugify";
import { toast } from "react-toastify";

import UploadImage from "./UploadImage";

import { noImage } from "../common/uriImages";

const ProgDetails = ({ program, setProgram, handleSubmit }) => {
  const [image, setImage] = useState(noImage);
  const [imageOk, setImageOk] = useState(false);

  useEffect(() => {
    setImage(program.image1 ? program.image1 : noImage);
    setImageOk(program.image1 ? true : false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    setProgram({ ...program, ...values, image1: imageOk ? image : noImage });
    handleSubmit({ ...program, ...values, image1: imageOk ? image : noImage });
  };

  const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.map((field) => {
      return toast.error(field.errors[0]);
    });
  };

  return (
    <div align="center" style={{ padding: 40 }}>
      <UploadImage image={image} setImage={setImage} setImageOk={setImageOk} />
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
              message: "Please input your Title!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              setProgram({
                ...program,
                slug: slugify(e.target.value),
                saleSlug: slugify(e.target.value),
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Program Slug"
          rules={[
            {
              required: true,
              message: "Please input your Program Slug!",
            },
          ]}
        >
          <Input
            value={program.slug}
            onChange={(e) =>
              setProgram({
                ...program,
                slug: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Sales Slug"
          rules={[
            {
              required: true,
              message: "Please input your Sales Slug!",
            },
          ]}
        >
          <Input
            value={program.saleSlug}
            onChange={(e) =>
              setProgram({
                ...program,
                saleSlug: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Sub-Title"
          name="subtitle"
          rules={[
            {
              required: true,
              message: "Please input your Sub-Title!",
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
              message: "Please input your Description!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
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
              width: isMobile ? "100%" : 350,
              height: isMobile ? 50 : 60,
              fontSize: isMobile ? 18 : 24,
              marginTop: 30,
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProgDetails;
