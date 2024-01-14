import React, { useState } from "react";
import { Layout as AntLayout, Menu } from "antd";
import { Link, Outlet,useLocation, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import { Row, Col } from 'react-bootstrap';
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";

const Layout = () => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed);
  };
    return(
        <div className="Main">
            <NavBar toggleLeftSidebar={toggleLeftSidebar}/>
        <Row>
          <Col lg={2} md={4} sm={12}>
            <LeftArea isCollapsed={isLeftSidebarCollapsed} />
          </Col>
          <Col lg={7} md={8} sm={12}>
          <Outlet />
         
          </Col>
          <Col lg={3} md={12}>
            <RightArea />
          </Col>
        </Row>
      </div>
    )
}

export default Layout;