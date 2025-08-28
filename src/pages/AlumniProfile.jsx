import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Upload,
  Avatar,
  Row,
  Col,
  Alert,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Navbar from "../component/Navbar";
import { getAlumniById, deleteAlumni, updateAlumni } from "../service/AlumniService";
import { logOut } from "../service/Authentication";
import { useNavigate } from "react-router-dom";

const id = localStorage.getItem("id");

const AlumniProfile = () => {
  const [form] = Form.useForm();
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
const navigate = useNavigate();
  // Fetch alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await getAlumniById(id);
        if (res) {
          const formValues = {
            name: res.user?.name || "",
            email: res.user?.email || "",
            mobile: res.user?.mobile || "",
            prn: res.prn || "",
            companyName: res.companyName || "",
            position: res.position || "",
            techStack: res.techStack || "",
          };
          form.setFieldsValue(formValues);
          if (res.profilePic) setProfilePic(res.profilePic);
        }
      } catch (error) {
        setAlert({ type: "error", message: "Failed to load alumni data", visible: true });
        console.error(error);
      }
    };

    fetchAlumni();
  }, []);

  // Update alumni
  const handleUpdate = async (values) => {
    try {
      const updatedValues = { ...values, profilePic };
      await updateAlumni(id, updatedValues);
      setAlert({ type: "success", message: "Profile updated successfully!", visible: true });
    } catch (error) {
      setAlert({ type: "error", message: "Failed to update profile", visible: true });
      console.error(error);
    }
  };

  // Delete alumni
  const handleDelete = async () => {
    try {
      await deleteAlumni(id);
      setAlert({ type: "success", message: "Profile deleted successfully!", visible: true });
      logOut(navigate);
    } catch (error) {
      setAlert({ type: "error", message: "Failed to delete profile", visible: true });
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 15px" }}>
        <Card
          title="Alumni Profile"
          bordered={false}
          style={{
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            borderRadius: 12,
            padding: "30px",
          }}
        >
          {/* Alert */}
          {alert.visible && (
            <Alert
              style={{ marginBottom: 20 }}
              message={alert.message}
              type={alert.type}
              closable
              onClose={() => setAlert({ ...alert, visible: false })}
            />
          )}

          {/* Profile Picture */}
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <Avatar
              size={150}
              src={profilePic}
              style={{ boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
            />
            <div style={{ marginTop: 15 }}>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  const reader = new FileReader();
                  reader.onload = (e) => setProfilePic(e.target.result);
                  reader.readAsDataURL(file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Change Photo</Button>
              </Upload>
            </div>
          </div>

          {/* Form Fields */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            scrollToFirstError
          >
            <Row gutter={[24, 16]}>
              {/* Personal Info */}
              <Col xs={24} sm={12}>
                <Form.Item label="Name" name="name">
                  <Input prefix={<EditOutlined />} placeholder="Full Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Email" name="email">
                  <Input prefix={<MailOutlined />} placeholder="Email Address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Mobile" name="mobile">
                  <Input prefix={<PhoneOutlined />} placeholder="Mobile Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="PRN" name="prn">
                  <Input placeholder="PRN" />
                </Form.Item>
              </Col>

              {/* Professional Info */}
              <Col xs={24} sm={12}>
                <Form.Item label="Company Name" name="companyName">
                  <Input placeholder="Company Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Position" name="position">
                  <Input placeholder="Position" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Tech Stack" name="techStack">
                  <Input placeholder="Tech Stack / Skills" />
                </Form.Item>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Space size="middle" wrap>
                <Button type="primary" htmlType="submit">
                  Update Profile
                </Button>
                <Button danger onClick={handleDelete}>
                  Delete Profile
                </Button>
              </Space>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default AlumniProfile;
