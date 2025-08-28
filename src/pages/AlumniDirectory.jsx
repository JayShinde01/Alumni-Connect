import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Input,
  Space,
  Select,
  Pagination,
  Typography,
  Modal,
  Button,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import Navbar from "../component/Navbar"; // ensure path is correct
import { getAllAlumni } from "../service/AlumniService"; // your API service

const { Option } = Select;
const { Text, Title } = Typography;

const AlumniDirectory = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  async function fetchAlumni() {
    try {
      const res = await getAllAlumni();
      setAlumniData(res || []);
    } catch (err) {
      console.error("Error fetching alumni:", err);
      setAlumniData([]);
    }
  }

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleCardClick = (alumni) => {
    setSelectedAlumni(alumni);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedAlumni(null);
  };

  return (
    <>
      <Navbar />
      <div className="alumni-container" style={{ padding: "20px" }}>
        <Title level={2}>Alumni Directory</Title>
        <Text type="secondary">
          Connect with experienced alumni for mock interviews and career advice.
        </Text>

        {/* Search Bar */}
        <Input.Search
          placeholder="Search by name, company, or skills"
          enterButton
          style={{ margin: "20px 0", maxWidth: 400 }}
        />

        {/* Filters */}
        <Space className="filters" style={{ marginBottom: 20 }}>
          <Select placeholder="Company" style={{ width: 160 }}>
            <Option value="google">Google</Option>
            <Option value="microsoft">Microsoft</Option>
          </Select>
          <Select placeholder="Years of Experience" style={{ width: 180 }}>
            <Option value="0-2">0-2 Years</Option>
            <Option value="3-5">3-5 Years</Option>
          </Select>
          <Select placeholder="Skills" style={{ width: 150 }}>
            <Option value="java">Java</Option>
            <Option value="react">React</Option>
          </Select>
          <Select placeholder="Technology Stack" style={{ width: 180 }}>
            <Option value="mern">MERN</Option>
            <Option value="springboot">Spring Boot</Option>
          </Select>
        </Space>

        {/* Alumni Cards */}
        <Row gutter={[16, 16]} className="alumni-list">
          {alumniData.length === 0 ? (
            <Text>No alumni found.</Text>
          ) : (
            alumniData.map((alumni) => (
              <Col xs={24} md={12} lg={8} key={alumni.alumniId}>
                <Card
                  className="alumni-card"
                  hoverable
                  onClick={() => handleCardClick(alumni)}
                >
                  <Card.Meta
                    avatar={
                      <Avatar
                        src={alumni.profilePic || ""}
                        size={70}
                        icon={<UserOutlined />}
                      />
                    }
                    title={
                      <Text strong>
                        {alumni.user?.name || "Name not available"}
                      </Text>
                    }
                    description={
                      <>
                        <Text>
                          {alumni.position || "Position not available"}
                        </Text>
                        <br />
                        <Text type="secondary">
                          {alumni.companyName || "Company not available"}
                        </Text>
                        <br />
                        {alumni.techStack && (
                          <Text type="secondary">
                            Tech Stack: {alumni.techStack}
                          </Text>
                        )}
                        <br />
                        <Text type="secondary">
                          Role: {alumni.role || "ALUMNI"}
                        </Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Pagination */}
        <div className="pagination" style={{ marginTop: 20 }}>
          <Pagination defaultCurrent={1} total={alumniData.length} pageSize={6} />
        </div>

        {/* Alumni Modal */}
        <Modal
          title={selectedAlumni?.user?.name || "Alumni Details"}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
            <Button key="close" onClick={null}>
              Create Request
            </Button>,
          ]}
          width={600}
        >
          {selectedAlumni && (
            <div style={{ textAlign: "center" }}>
              <Avatar
                src={selectedAlumni.profilePic || ""}
                size={120}
                icon={<UserOutlined />}
                style={{ marginBottom: 20 }}
              />
              <p>
                <Text strong>Email: </Text>
                {selectedAlumni.user?.email || "N/A"}
              </p>
              <p>
                <Text strong>Mobile: </Text>
                {selectedAlumni.user?.mobile || "N/A"}
              </p>
              <p>
                <Text strong>PRN: </Text>
                {selectedAlumni.prn || "N/A"}
              </p>
              <p>
                <Text strong>Company: </Text>
                {selectedAlumni.companyName || "N/A"}
              </p>
              <p>
                <Text strong>Position: </Text>
                {selectedAlumni.position || "N/A"}
              </p>
              <p>
                <Text strong>Tech Stack: </Text>
                {selectedAlumni.techStack || "N/A"}
              </p>
              <p>
                <Text strong>Role: </Text>
                {selectedAlumni.role || "ALUMNI"}
              </p>

            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default AlumniDirectory;
