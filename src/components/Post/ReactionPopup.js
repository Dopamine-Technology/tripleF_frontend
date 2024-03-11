import React,{useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import useAxios from '../Auth/useAxiosHook.interceptor';
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LiaMedalSolid } from "react-icons/lia";
import Reaction from './Reaction';
import './Post.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Bronze from '../../assets/imgs/bronze.svg';
import Silver from '../../assets/imgs/silver.svg';
import Gold from '../../assets/imgs/gold.svg';
import Medal from '../../assets/imgs/Medal.svg'

function ReactionPopup({handleClose,show,id}) {
    const axios=useAxios();
    const [activeTab, setActiveTab] = useState("All");
    const[allReaction,setAllReaction]=useState();
    const [subReaction,setSubReaction]=useState();
    const [loading, setLoading] = useState(true);

    const handleTabSelect = async (tab) => {
      let points;
      switch (tab) {
        case 'Gold':
          points = 3;
          break;
        case 'Silver':
          points = 2;
          break;
        case 'Bronze':
          points = 1;
          break;
        default:
          points = '';
      }
    
      try {
        const response = await axios.post(`/status/get_reactions/${id}`, { points });
    
        if (tab === 'All') {
          setAllReaction(response.data.result);
        } else {
          setSubReaction(response.data.result);
        }
    
        setActiveTab(tab);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

      useEffect(() => {
    
        const fetchReactionsData = async () => {
            const points='';
          try {
            const response = await axios.post(`/status/get_reactions/${id}`,{points});
            setAllReaction(response.data.result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchReactionsData()
        
      }, []);
      

  

      const users=[
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:true

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:false

        },
        {
            img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU',
            username:'username',
            isFollowed:false

        },
        
      ]

    const tabs = {
        All: {
          title: (<p className='reaction-p'> All </p>),
          content: (
            <>
        <Reaction users={allReaction} />
            </>
          ),
        },
        Gold: {
          title: (<div className='d-flex'><div className='rectangle me-2'><img src={Gold} className='me-2' /></div><p className='reaction-p'> 322 </p></div>),
          content: (
            <>
            <Reaction users={subReaction}/>
            </>
          ),
        },
        Silver: {
          title: (<div className='d-flex'><div className='rectangle me-2'><img src={Silver} className='me-2' /></div> <p className='reaction-p'> 322 </p></div>),
          content: (
            <>
              <Reaction users={subReaction}/>
            </>
          ),
        },
        Bronze: {
            title: (<div className='d-flex'><div className='rectangle me-2'>  <img src={Bronze} className='me-2' /></div> <p className='reaction-p'> 322 </p></div>),
            content: (
              <>
                 <Reaction users={subReaction}/>
 
              </>
            ),
          },
      }
 
    return(
        <>
  
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header>
            <Modal.Title>
                   <Tabs activeKey={activeTab} onSelect={(selectedTabKey) => handleTabSelect(selectedTabKey)} justify>
            {Object.keys(tabs).map((tabKey) => (
              <Tab
                key={tabKey}
                eventKey={tabKey}
                tabClassName={
                  (activeTab === tabKey
                    ? " text-success bg-transparent border border-3 border-success border-end-0 border-top-0 border-start-0 "
                    : " text-muted")
                }
                title={tabs[tabKey].title}
              >
                
                    <div className='content-div'> {tabs[tabKey].content}</div>
              </Tab>
            
            ))}
          </Tabs>
            </Modal.Title>
          </Modal.Header>
 
        </Modal>
      </>
    )
}

export default ReactionPopup;