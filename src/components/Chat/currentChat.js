import React ,{useState,useEffect}from 'react'
import useAxios from '../Auth/useAxiosHook.interceptor';
import { Row,Col,Container } from 'react-bootstrap';
import { useScreenWidth } from '../ScreenWidthContext/ScreenWidth.context';

function CurrentChat({id}) {

    const axios=useAxios();
    const[loading,setLoading]=useState(false);
    const[userData,setUserData]=useState();
    const { windowWidth, isSmallScreen, isTabletScreen, isProScreen } = useScreenWidth();

    useEffect(() => {
        setLoading(true); 
        axios
          .get(`user/get_profile/${id}`)
          .then((response) => {
            setUserData(response.data.result);
          })
          .catch((error) => {
            console.error("Error fetching chat messages:", error);
          })
          .finally(() => {
            setLoading(false); 
          });
      }, [id]); 

    return(
        <div className="mb-2 d-flex">
    
        <p className='header-title'><img src={userData?.image} width={isProScreen?'20px':'30px'} height={isProScreen?'20px':'30px'} style={{borderRadius:'30px',   backgroundColor:'#213555'}}/></p>
     
           <p className="sender-name ">{userData?.first_name} {userData?.first_name}</p>

      <hr style={{color:'#d3d7dd'}} />
  
      </div>
    )
}

export default CurrentChat;