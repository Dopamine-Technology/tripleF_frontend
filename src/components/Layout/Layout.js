import React, { useState } from "react";
import { Layout as AntLayout, Row, Col } from "antd";
import NavBar from "./Navbar";
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";
import './Navbar.css'
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = AntLayout;

const Layout = () => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed);
  };

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <NavBar toggleLeftSidebar={toggleLeftSidebar} />
      <AntLayout>
        <Sider
          width={80}
          className="bg-transparent"
        
          style={{ overflow: 'auto', height: '100vh', position: '', left: 0 }}
        >
          
          <LeftArea isCollapsed={isLeftSidebarCollapsed} />
        </Sider>
        <AntLayout style={{ transition: 'margin-left 0.3s' }} className="AntLayout">
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Row justify="center">
              <Col xs={24} md={24} lg={16}>
                <Outlet />
              </Col>
              <Col xs={24} md={24} lg={8}>
                <RightArea />
              </Col>
            </Row>
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
