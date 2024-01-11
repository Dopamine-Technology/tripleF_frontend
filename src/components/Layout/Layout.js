import React, { useState } from "react";
import { Layout as AntLayout, Menu } from "antd";
import { Link, Outlet,useLocation, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import { Row, Col } from 'react-bootstrap';
import LeftArea from "./LeftArea";
import RightArea from "./RightArea";

const Layout = () => {
    return(
        <div className="Main">
            <NavBar />
        <Row>
          <Col lg={3} md={4} sm={12}>
            <LeftArea />
          </Col>
          <Col lg={6} md={8} sm={12}>
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