import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Select, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { logIn } from "../service/Authentication";

const { Title } = Typography;
const { Option } = Select;

const Login = () => {

  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // const response = await logIn(values);
      console.log("Login Success:");
      setSuccess(true);
      setError(false);
      // form.resetFields();

      // Redirect based on role
      if (values.role === "ADMIN") navigate("/admin-dashboard");
      else if (values.role === "STUDENT") navigate("/student-dashboard");
      else if (values.role === "ALUMNI") navigate("/alumni-dashboard");
    

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="login-container">
      {success && (
        <Alert
          message="🎉 Login Successful!"
          type="success"
          showIcon
          closable
          style={{ marginBottom: 16 }}
          onClose={() => setSuccess(false)}
        />
      )}
      {error && (
        <Alert
          message="⚠️ Login Failed! Check your credentials."
          type="error"
          showIcon
          closable
          style={{ marginBottom: 16 }}
          onClose={() => setError(false)}
        />
      )}

      <Card className="login-card">
        <Title level={2} className="login-title">Role Based Login</Title>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
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
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
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

export default Login;
