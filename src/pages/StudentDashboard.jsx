import React from "react";
import { Card, Row, Col, Statistic, Table, Button } from "antd";
import  "../styles/studentdashboard.css";



const StudentDashboard = () => {
  // Dummy data for upcoming mock interviews
  const upcomingInterviews = [
    { key: 1, alumni: "John Doe", company: "Google", date: "2025-09-01", time: "10:00 AM" },
    { key: 2, alumni: "Jane Smith", company: "Microsoft", date: "2025-09-03", time: "02:00 PM" },
    { key: 3, alumni: "Bob Johnson", company: "Amazon", date: "2025-09-05", time: "11:00 AM" },
  ];

  const columns = [
    { title: "Alumni Name", dataIndex: "alumni", key: "alumni" },
    { title: "Company", dataIndex: "company", key: "company" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    {
      title: "Action",
      key: "action",
      render: () => <Button type="primary">Join Interview</Button>,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Student Dashboard</h1>

      {/* Overview cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Upcoming Interviews" value={3} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Payments Made" value={1500} prefix="₹" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Mock Interviews Completed" value={5} />
          </Card>
        </Col>
      </Row>

      {/* Upcoming Interviews Table */}
      <Card title="Upcoming Mock Interviews">
        <Table dataSource={upcomingInterviews} columns={columns} />
      </Card>
    </div>
  );
};

export default StudentDashboard;
