import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { AimOutlined, BulbOutlined, TeamOutlined, HeartOutlined } from "@ant-design/icons";
import "../styles/about.css";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <Title level={1} className="hero-title">About Our Alumni Platform</Title>
        <Paragraph className="hero-subtitle">
          Connecting <b>Students</b> and <b>Alumni</b> to share knowledge, mentorship, and opportunities worldwide.
        </Paragraph>
      </div>

      {/* Mission & Vision */}
      <Row gutter={24} justify="center" className="info-row">
        <Col xs={24} md={12}>
          <Card className="info-card" hoverable>
            <AimOutlined className="info-icon" />
            <Title level={3}>Our Mission</Title>
            <Paragraph>
              To bridge the gap between students and alumni by enabling mentorship,
              career development, and long-lasting connections.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="info-card" hoverable>
            <BulbOutlined className="info-icon" />
            <Title level={3}>Our Vision</Title>
            <Paragraph>
              To build a strong alumni ecosystem where guidance and opportunities 
              create future leaders worldwide.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Extra Values Section */}
      <Row gutter={24} justify="center" className="info-row">
        <Col xs={24} md={12}>
          <Card className="info-card" hoverable>
            <TeamOutlined className="info-icon" />
            <Title level={3}>Community First</Title>
            <Paragraph>
              We believe in building a vibrant alumni community that thrives on collaboration and growth.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="info-card" hoverable>
            <HeartOutlined className="info-icon" />
            <Title level={3}>Lifelong Support</Title>
            <Paragraph>
              Alumni and students can rely on each other for career advice, networking, and guidance at every stage.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;
