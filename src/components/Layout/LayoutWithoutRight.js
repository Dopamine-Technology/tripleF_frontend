import React, { useState,useLayoutEffect} from "react";
import { Layout as AntLayout, Row, Col } from "antd";
import NavBar from "./Navbar";
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";
import './Navbar.css'
import { Outlet } from "react-router-dom";
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

const { Header, Sider, Content } = AntLayout;

const Layout = ({socket,notifications}) => {

  const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();



const [isCollapsed, setIsCollapsed] = useState(isSmallScreen?true:false);

const toggleCollapse = () => {
  setIsCollapsed(!isCollapsed);
};
  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <NavBar toggleCollapse={toggleCollapse} isSmallScreen={isSmallScreen} notifications={notifications}  />
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
          <Content style={{ margin: "24px 16px 0 0", overflow: "initial" }}>
            <Row justify="center">
              <Col 
              // xs={24} md={24} lg={16}
              >
                <Outlet />
              </Col>
              <Col xs={24} md={24} lg={8}>
            
              </Col>
            </Row>
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
