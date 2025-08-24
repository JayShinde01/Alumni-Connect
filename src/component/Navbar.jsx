import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "../styles/navbar.css";


const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="navbar">
      {/* Logo */}
      <div className="logo">Alumni Portal</div>

      {/* Menu Links */}
      <Menu mode="horizontal" className="menu-items" selectable={false}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/registration">Registration</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
