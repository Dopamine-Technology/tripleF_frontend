import React from "react";
import './Navbar.css'
import { RiMessage3Line } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import {FaRegFlag, FaUsers, FaPlusCircle, FaFacebookMessenger, FaBell} from 'react-icons/fa'
import Logo from '../../assets/imgs/Logo.svg'
function Navbar(){
    return(
        <div className="HomePage">
            <div className="header">

            <div className="first-header">
                <div className="logo">
                    <img src={Logo} alt="logo" style={{height:"67px" ,padding:"1rem"}}/>
                </div>
               
            </div>
            <div className="middle-header">

            </div>
            <div className="third-header">
                
                <div className="plus">
                    <RiMessage3Line fontSize ="1.3rem"  color='#979797'/>
                </div>
                <div className="plus">
                    <IoIosNotificationsOutline fontSize ="1.3rem" color='#979797'/>
                </div>
               
                <div className="Pluss">
                    <img src="https://thumbs.dreamstime.com/b/portrait-father-son-football-54984814.jpg" alt="dp" style={{height:"40px",width:'40px'}}/>
                </div>
            </div>
            </div>
        </div>
    )
}
export default Navbar;