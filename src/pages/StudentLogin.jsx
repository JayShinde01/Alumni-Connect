import React from "react";
import { Form, Input, Button, Card } from "antd";
import "../styles/studentLogin.css";

const StudentLogin = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);
    alert("Login Successful! ✅");
  };

  return (
    <div className="student-login-container">
      <Card className="student-login-card" title="Student Login" bordered={false}>
        <Form
          form={form}
          name="student_login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Student Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="PRN"
            name="prn"
            rules={[{ required: true, message: "Please enter your PRN!" }]}
          >
            <Input placeholder="Enter PRN number" />
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

export default StudentLogin;
