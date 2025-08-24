import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/alumniLogin.css";

const AlumniLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Alumni Login Data:", values);
    // After successful login → redirect
    navigate("/dashboard");
  };

  return (
    <div className="alumni-login-container">
      <Card className="alumni-login-card" title="Alumni Login" bordered={false}>
        <Form
          form={form}
          name="alumni_login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Alumni Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="PRN / ID"
            name="prn"
            rules={[{ required: true, message: "Please enter your PRN / ID!" }]}
          >
            <Input placeholder="Enter PRN or Employee ID" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number!" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AlumniLogin;
