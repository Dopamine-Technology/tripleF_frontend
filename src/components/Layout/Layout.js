import React, { useState,useLayoutEffect} from "react";
import { Layout as AntLayout, Row, Col } from "antd";
import NavBar from "./Navbar";
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";
import './Navbar.css'
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = AntLayout;

const Layout = ({socket}) => {
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
const isTabletScreen = windowWidth > 600 && windowWidth <= 820;
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <NavBar toggleCollapse={toggleCollapse} isSmallScreen={isSmallScreen}  />
      <AntLayout>
        <Sider
          width={isCollapsed?0:80}
          className="bg-transparent"
        
          style={{ overflow: 'auto', height: '100vh', position: '', left: 0, width: isCollapsed ? 0 : 80 }}
        >
          
          <LeftArea isCollapsed={isCollapsed} toggleCollapse={toggleCollapse}  />
        </Sider>
        <AntLayout style={{ transition: 'margin-left 0.3s' }} className="AntLayout" 
        style={{marginLeft:isSmallScreen ?(isCollapsed?'-3rem':'100rem'):isTabletScreen?'4rem':''}}>
                                                    {/* marginLeft: isSmallScreen ? (isCollapsed ? '-3rem' : '0') : '100rem' */}
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
