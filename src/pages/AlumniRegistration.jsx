import React, { useState } from "react";
import { Form, Input, Button, Upload, Card, Row, Col, Alert, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../styles/alumniRegistration.css";
import {registerUser} from "../service/Authentication"
const AlumniRegistration = () => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const onFinish = async (values) => {
    console.log("Form Submitted:", values);
    setSuccess(true);
    setError(false); // clear error if success
    await registerUser(values);
      form.resetFields();
    setTimeout(() => setSuccess(false), 5000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form Failed:", errorInfo);
    setError(true);
    setSuccess(false); // clear success if error
    setTimeout(() => setError(false), 5000);
  };

  return (
    <div className="registration-container">
      <Card className="registration-card" bordered={false}>
        <h2 className="form-title">Alumni Registration</h2>

        {/* ✅ Success Alert */}
        {success && (
          <Alert
            message="🎉 Alumni Registered Successfully!"
            type="success"
            showIcon
            closable
            style={{ marginBottom: 16 }}
            onClose={() => setSuccess(false)}
          />
        )}

        {/* ❌ Error Alert */}
        {error && (
          <Alert
            message="⚠️ Please check the form fields and try again!"
            type="error"
            showIcon
            closable
            style={{ marginBottom: 16 }}
            onClose={() => setError(false)}
          />
        )}

        <div className="form-scroll">
          <Form
            form={form}
            layout="vertical"
            name="alumni_registration"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed} // <-- added
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter your full name!" }]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="PRN / ID"
                  name="prn"
                  rules={[{ required: true, message: "Please enter your PRN/ID!" }]}
                >
                  <Input placeholder="Enter PRN or Employee ID" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
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
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="mobile"
                  rules={[
                    { required: true, message: "Please enter your phone number!" },
                    { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number!" },
                  ]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Current Company"
                  name="company"
                  rules={[{ required: false, message: "Please enter your company name!" }]}
                >
                  <Input placeholder="Enter company name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Job Title"
                  name="jobTitle"
                  rules={[{ required: false, message: "Please enter your job title!" }]}
                >
                  <Input placeholder="Enter job title" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Skills"
              name="skills"
              rules={[{ required: false, message: "Please enter your skills!" }]}
            >
              <Input.TextArea placeholder="Enter skills (comma separated)" rows={3} />
            </Form.Item>
                
            <Form.Item
              label="Profile Photo"
              name="profilePhoto"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
              rules={[{ required: false, message: "Please upload your profile photo!" }]}
            >
              <Upload beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Upload Profile Photo</Button>
              </Upload>
            </Form.Item>
              <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please create paswword!" }]}
            >
              <Input placeholder="Enter password more than 6 " rows={3} />
            </Form.Item>
             <Form.Item
  label="Role"
  name="role"
  rules={[{ required: true, message: "Please select a role!" }]}
>
  <Select placeholder="Select Role">
    <Select.Option value="STUDENT">Student</Select.Option>
    <Select.Option value="ALUMNI">Alumni</Select.Option>
    <Select.Option value="ADMIN">Admin</Select.Option>
  </Select>
</Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" block className="submit-btn">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AlumniRegistration;
