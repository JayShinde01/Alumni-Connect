import React from "react";
import { Card, Row, Col, Statistic, Table, Button } from "antd";
// import "../styles/alumnidashboard.css";

const AlumniDashboard = () => {
  // Dummy data for scheduled mock interviews
  const scheduledInterviews = [
    { key: 1, student: "Alice Johnson", date: "2025-09-02", time: "10:00 AM" },
    { key: 2, student: "Bob Smith", date: "2025-09-04", time: "02:00 PM" },
    { key: 3, student: "Charlie Brown", date: "2025-09-06", time: "11:00 AM" },
  ];

  const columns = [
    { title: "Student Name", dataIndex: "student", key: "student" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    {
      title: "Action",
      key: "action",
      render: () => <Button type="primary">Start Interview</Button>,
    },
  ];

  return (
    <div className="alumni-dashboard-container">
      <h1>Alumni Dashboard</h1>

      {/* Overview cards */}
      <Row gutter={16} className="dashboard-cards" style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Upcoming Interviews" value={3} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Payments Received" value={4500} prefix="₹" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Mock Interviews Completed" value={12} />
          </Card>
        </Col>
      </Row>

      {/* Scheduled Interviews Table */}
      <Card className="upcoming-interviews-card" title="Scheduled Mock Interviews">
        <Table dataSource={scheduledInterviews} columns={columns} />
      </Card>
    </div>
  );
};

export default AlumniDashboard;
