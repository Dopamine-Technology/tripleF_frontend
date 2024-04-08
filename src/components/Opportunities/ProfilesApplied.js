import React, { useState, useEffect } from 'react';
import LeftArrow from '../../assets/imgs/leftArrow.svg';
import './style.css';
import { AiOutlineSearch } from "react-icons/ai";
import JordanFlag from '../../assets/imgs/JordanFlag.webp';
import PersonRunning from '../../assets/imgs/personRunning.svg';
import PersonHeart from '../../assets/imgs/personHeart.svg';
import RightArrow from '../../assets/imgs/rightArrow.svg';
import { useParams } from 'react-router-dom';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { useNavigate } from 'react-router-dom';

function ProfilesApplied() {
    const { id } = useParams();
    const { name } = useParams();
    const [profiles, setProfiles] = useState([]);
    const axios = useAxios();
    const navigate = useNavigate();
    let counter = 0;

    const fetchOppData = async () => {
        try {
            const response = await axios.get(`opportunities/applicants/${id}`);
            setProfiles(response.data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchOppData();
    }, []);

    return (
        <div style={{ backgroundColor: 'white', marginLeft: '7rem', padding: '3rem' }}>
            <p><img src={LeftArrow} className='me-3 ' style={{cursor:'pointer'}} onClick={()=>navigate('/applied/list')} /><span className='applied-title'>{name}</span></p>
            <p className='applicants-num'>{profiles.length} Applicants</p>
            <div className="search-container mt-4" style={{ marginLeft: '2rem' }}>
                <input type="text" placeholder="Search" className="search-input" />
                <AiOutlineSearch className="search-icon" />
            </div>
            {profiles.map((profile, index) => (
                <div className=' mt-4' key={index}>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <div className='d-flex' >
                            <img src={profile.image ? profile.image : profile.social_image} className='appProfile-img me-3' />
                            <div>
                                <p className='appProfile-name'>{profile.first_name} {profile.last_name}</p>
                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                        <img src={JordanFlag} width='18px' height='18px' style={{ margin: '1px 6px 1px 0' }} />
                                        <p className='appProfile-content me-4'>{profile.profile.country.name}</p>
                                    </div>
                                    <div className='d-flex'><img src={PersonRunning} width='18px' height='18px' style={{ margin: '1px 6px 1px 0' }} />
                                        <p className='appProfile-content me-4'> {profile.profile.parent_position?.name}</p>
                                    </div>
                                    <div className='d-flex'><img src={PersonHeart} width='18px' height='18px' style={{ margin: '1px 6px 1px 0' }} />
                                        <p className='appProfile-content me-4'>{profile.profile.gender}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={RightArrow} className='go-profile' onClick={() => { navigate(`/profile/${profile.id}`) }} />
                    </div>
                    <hr style={{ color: 'rgba(211, 215, 221, 1)' }} />
                </div>
            ))}
        </div>
    )
}

export default ProfilesApplied;
