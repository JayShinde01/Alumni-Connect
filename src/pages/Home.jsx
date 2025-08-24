import React from "react";
import { Card, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "../styles/home.css";

import StudentLogin from "./StudentLogin";
import Navbar from "../component/Navbar";


export default function Home() {
  return (
    


    
    <div className="home-container">
      <Navbar/>
       <p className="home-intro">
        Welcome to the Alumni Portal. Connect with former students, explore opportunities, 
        and stay updated with college events.
      </p>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="" className="home-card">
            <p>Login using your college credentials.</p>
            <Link to="/slog">
              <Button type="primary">Student Login</Button>
              
            </Link>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="" className="home-card">
            <p>Register or login as Alumni to help students.</p>
            <Link to="/Alumnilogin">
              <Button type="primary">Alumni Login</Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
    
  );
}

