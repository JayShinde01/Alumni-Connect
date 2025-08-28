import React from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  FileDoneOutlined,
  DollarOutlined,
  LogoutOutlined,
  ProfileOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { logOut } from "../service/Authentication";

const { Header } = Layout;

const Navbar = () => {
const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

 const handleLogout = () => {
    logOut(navigate);
   
  };

  // Student Menu
  const studentMenu = (
    <Menu>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/student-dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />}>
        <Link to="/alumnidirectory">Alumni</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FileDoneOutlined />}>
        <Link to="/student-interviews">My Interviews</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<DollarOutlined />}>
        <Link to="/student-payments">Payments</Link>
      </Menu.Item>
    </Menu>
  );

  // Alumni Menu
  const alumniMenu = (
    <Menu>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/alumni-dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ProfileOutlined />}>
        <Link to="/alumniprofile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<TeamOutlined />}>
        <Link to="/requests">Requests</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<CalendarOutlined />}>
        <Link to="/alumni/availability">Set Availability</Link>
      </Menu.Item>
    </Menu>
  );

  // Admin Menu
  const adminMenu = (
    <Menu>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/admin/students">Students</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<TeamOutlined />}>
        <Link to="/admin/alumni">Alumni</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FileDoneOutlined />}>
        <Link to="/admin/interviews">Interviews</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="navbar">
      {/* Left Logo */}
      <div className="logo">🎓 Welcome {name || "Guest"} to Alumni-Connect</div>

      {/* Middle Menu */}
      <Menu mode="horizontal" className="menu-items" selectable={false}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        {!token && (
          <>
            <Menu.Item key="about" icon={<InfoCircleOutlined />}>
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<UserAddOutlined />}>
              <Link to="/registration">Register</Link>
            </Menu.Item>
          </>
        )}

        {token && role === "STUDENT" && (
          <Dropdown overlay={studentMenu} placement="bottomCenter">
            <Button type="link" icon={<DashboardOutlined />}>
              Student Panel
            </Button>
          </Dropdown>
        )}

        {token && role === "ALUMNI" && (
          <Dropdown overlay={alumniMenu} placement="bottomCenter">
            <Button type="link" icon={<TeamOutlined />}>
              Alumni Panel
            </Button>
          </Dropdown>
        )}

        {token && role === "ADMIN" && (
          <Dropdown overlay={adminMenu} placement="bottomCenter">
            <Button type="link" icon={<UserOutlined />}>
              Admin Panel
            </Button>
          </Dropdown>
        )}
      </Menu>

      {/* Right Logout */}
      {token && (
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </Button>
      )}
    </Header>
  );
};

export default Navbar;
