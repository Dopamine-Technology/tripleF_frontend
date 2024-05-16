import React,{useState,useEffect} from 'react'
import NavBar from '../components/Register/Navbar'
import Footer from '../components/Footer/Footer'
import RegisterForm from '../components/Register/RegisterForm'
import CombinedNavbars from '../components/Register/Navbar'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'
import { useLocation , Link } from 'react-router-dom';


function Register() {
  const [loading, setLoading] = useState(false); 
  const location = useLocation();


  const handleLoadingChange = (newLoadingState) => {
    setLoading(newLoadingState);
  };
//   useEffect(() => {
//     window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
// }, []);
  
  if(loading){
  return <LoadingScreen />
}
  return (
    
    <div style={{overflowX:'hidden'}}>
      <CombinedNavbars />
       <RegisterForm onLoadingChange={handleLoadingChange}/>
      <Footer />
    </div>
  )
}

export default Register