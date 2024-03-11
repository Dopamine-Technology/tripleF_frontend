import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { message } from 'antd';

const FollowBtn =  ({id,is_followed}) => {
    const axios=useAxios();

    const handleFollow = async () => { 
        const response= await axios.get(`follow/toggle/${id}`);
        message.success(response.data.message);
    };
    return (  
<Button className='Register-button' onClick={handleFollow}>
             <Link to='' className='Register-link '> {is_followed ? 'Unfollow' : 'Follow +'} </Link>
</Button> 
    )
}
export default FollowBtn;