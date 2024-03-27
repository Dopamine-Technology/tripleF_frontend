import React, { useState,useLayoutEffect} from "react";
import { Layout as AntLayout, Row, Col } from "antd";
import NavBar from "../Layout/Navbar";
import '../Layout/Navbar.css';
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Header, Sider, Content } = AntLayout;

const SettingsLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
};

const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useLayoutEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const isSmallScreen = windowWidth <= 600;

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <NavBar toggleCollapse={toggleCollapse} isSmallScreen={isSmallScreen}  />
      <AntLayout>
        <Sider
          width={isCollapsed?0:80}
          className="bg-transparent"
        
          style={{ overflow: 'auto', height: '100vh', position: '', left: 0, width: isCollapsed ? 0 : 80 }}
        >
          
          <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}  />
        </Sider>
        <AntLayout style={{ transition: 'margin-left 0.3s' }} className="AntLayout" style={{marginLeft:isSmallScreen ?(isCollapsed?'-3rem':'100rem'):''}}>
                                                   
          <Content style={{ margin: "24px 0px 0px 0px", overflow: "initial" }}>
            <Row >
              <Col xs={24} md={24} lg={20}>
                <Outlet />
              </Col>

            </Row>
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default SettingsLayout;
