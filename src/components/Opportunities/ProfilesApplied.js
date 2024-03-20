import React from 'react';
import LeftArrow from '../../assets/imgs/leftArrow.svg';
import './style.css';
import { AiOutlineSearch } from "react-icons/ai";
import JordanFlag from '../../assets/imgs/JordanFlag.webp';
import PersonRunning from '../../assets/imgs/personRunning.svg';
import PersonHeart from '../../assets/imgs/personHeart.svg';
import RightArrow from '../../assets/imgs/rightArrow.svg'

function ProfilesApplied(){
    const profiles=[
        {
            img:'https://kprofiles.com/wp-content/uploads/2021/10/My_Teenage_Girl_Shin_Yeseul_profile_photo_1-651x800.webp',
            name:'Kareem Mohammad',
            country:'Jordan',
            position:'Goal Kepper',
            gender:'Male'
        },
        {
            img:'https://kprofiles.com/wp-content/uploads/2021/10/%C2%A2Minju-651x800.webp',
            name:'Samer Sabri',
            country:'Jordan',
            position:'Goal Kepper',
            gender:'Male'
        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHgXgLfXxoklBzSoD9QyG3mGQa9etSYelra-HMqKPR7dIdo97klm4hC_3ZLiJa1SDPI-s&usqp=CAU',
            name:'Mohammad Abdullrahman',
            country:'Jordan',
            position:'Goal Kepper',
            gender:'Male'
        },
    ]
    return(
        <div style={{backgroundColor:'white',marginLeft:'7rem',padding:'3rem'}}>
           <p ><img src={LeftArrow} className='me-3' /><span className='applied-title mt-5'>Opportunities title here</span></p>
           <p className='applicants-num'>32 Applicants</p>
           <div className="search-container mt-4" style={{marginLeft:'2rem'}}>
                        <input type="text" placeholder="Search" className="search-input" />
                        <AiOutlineSearch className="search-icon" />
           </div>
           {profiles.map((profile)=>(
            <div className=' mt-4'>
                <div className='d-flex' style={{justifyContent:'space-between'}}>
                <div className='d-flex' >
                    <img src={profile.img} className='appProfile-img me-3'/>
                    <div>
                      <p className='appProfile-name'>{profile.name}</p>
                      <div className='d-flex' style={{justifyContent:'space-between'}}>
                       <div className='d-flex' style={{justifyContent:'space-between'}}>
                        <img src={JordanFlag} width='18px' height='18px' style={{margin: '1px 6px 1px 0'}}/>
                        <p className='appProfile-content me-4'>Jordan</p>
                       </div>
                       <div className='d-flex'><img src={PersonRunning} width='18px' height='18px' style={{margin: '1px 6px 1px 0'}} />
                       <p className='appProfile-content me-4'> Goal Kepper</p>
                       </div>
                       <div className='d-flex'><img src={PersonHeart} width='18px' height='18px' style={{margin: '1px 6px 1px 0'}} />
                       <p className='appProfile-content me-4'>Male</p>
                       </div>
                      </div>
                    </div>
                
                </div>  
                <img src={RightArrow} className='go-profile' />  
             </div>
             <hr style={{ color: 'rgba(211, 215, 221, 1)'}} />
            </div>
            
           ))}
           
        </div>
    )
}

export default ProfilesApplied;

