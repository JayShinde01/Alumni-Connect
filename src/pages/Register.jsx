import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, Alert } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { registerUser } from "../service/Authentication";
import Navbar from "../component/Navbar";

const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerUser(values); // call API
      console.log("Register Success:", response);

      setSuccess(true);
      setError(false);
      form.resetFields();

      setTimeout(() => {
        setSuccess(false);
        navigate("/login"); // redirect to login after registration
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <>
     <Navbar/>
      <div className="login-container">
      
      {success && (
        <Alert
          message="🎉 Registration Successful!"
          type="success"
          showIcon
          closable
          style={{ marginBottom: 16 }}
          onClose={() => setSuccess(false)}
        />
      )}
      {error && (
        <Alert
          message="⚠️ Registration Failed! Try again."
          type="error"
          showIcon
          closable
          style={{ marginBottom: 16 }}
          onClose={() => setError(false)}
        />
      )}

      <Card className="login-card">
        <Title level={2} className="login-title">Role Based Registration</Title>
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[
              { required: true, message: "Please enter your mobile number!" },
              { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number!" },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter mobile number" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="Select role">
              <Option value="STUDENT">STUDENT</Option>
              <Option value="ALUMNI">ALUMNI</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </>
    
   
  );
};

export default Register;
