import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  message,
  Typography,
} from "antd";
import {
  getAllRequests,
  updateRequestStatus,
  rescheduleRequest,
  deleteRequest,
  getRequestsByAlumni
} from "../service/InterviewReq";
import moment from "moment";
import Navbar from "../component/Navbar";

const { Option } = Select;
const { Text } = Typography;

const InterviewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState("status"); // status or reschedule

  const [form] = Form.useForm();

  // Fetch all requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getRequestsByAlumni(20);
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch requests");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Open modal
  const openModal = (request, type) => {
    setSelectedRequest(request);
    setModalType(type);
    if (type === "status") {
      form.setFieldsValue({ status: request.status });
    } else if (type === "reschedule") {
      form.setFieldsValue({
        date: moment(request.date),
        startTime: moment(request.startTime, "HH:mm"),
        endTime: moment(request.endTime, "HH:mm"),
      });
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
    form.resetFields();
  };

  // Update status
  const handleStatusUpdate = async (values) => {
    try {
      await updateRequestStatus(selectedRequest.reqId, values);
      message.success("Status updated successfully");
      closeModal();
      fetchRequests();
    } catch (err) {
      console.error(err);
      message.error("Failed to update status");
    }
  };

  // Reschedule
  const handleReschedule = async (values) => {
    const payload = {
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    };
    try {
      await rescheduleRequest(selectedRequest.reqId, payload);
      message.success("Interview rescheduled successfully");
      closeModal();
      fetchRequests();
    } catch (err) {
      console.error(err);
      message.error("Failed to reschedule");
    }
  };

  // Delete request
  const handleDelete = async (reqId) => {
    try {
      await deleteRequest(reqId);
      message.success("Request deleted");
      fetchRequests();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete request");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Student Name",
      dataIndex: ["student", "user", "name"],
      key: "studentName",
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Alumni Name",
      dataIndex: ["alumni", "user", "name"],
      key: "alumniName",
      render: (text) => <Text>{text || "N/A"}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => text || "N/A",
    },
    {
      title: "Time",
      key: "time",
      render: (record) =>
        `${record.startTime || "N/A"} - ${record.endTime || "N/A"}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "PENDING") color = "orange";
        else if (status === "APPROVED") color = "green";
        else if (status === "REJECTED") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space>
          <Button type="primary" onClick={() => openModal(record, "status")}>
            Update Status
          </Button>
          <Button onClick={() => openModal(record, "reschedule")}>
            Reschedule
          </Button>
          <Button danger onClick={() => handleDelete(record.reqId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
console.log(requests);

  return (
    <>
    <Navbar/>
    <div style={{ padding: 20 }}>
      <h2>Interview Requests</h2>
      <Table
        columns={columns}
        dataSource={requests}
        rowKey="reqId"
        loading={loading}
        pagination={{ pageSize: 6 }}
        responsive
      />

      {/* Modal */}
      <Modal
        title={
          modalType === "status"
            ? "Update Status"
            : "Reschedule Interview Request"
        }
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        {modalType === "status" && (
          <Form form={form} layout="vertical" onFinish={handleStatusUpdate}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status">
                <Option value="PENDING">PENDING</Option>
                <Option value="APPROVED">APPROVED</Option>
                <Option value="REJECTED">REJECTED</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Status
              </Button>
            </Form.Item>
          </Form>
        )}
        {modalType === "reschedule" && (
          <Form form={form} layout="vertical" onFinish={handleReschedule}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Select new date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[{ required: true, message: "Select start time" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[{ required: true, message: "Select end time" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Reschedule
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
    </>
  );
};

export default InterviewRequests;
