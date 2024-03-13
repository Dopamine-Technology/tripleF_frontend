import React,{useState} from 'react'
import NavBar from '../components/Register/Navbar'
import Footer from '../components/Footer/Footer'
import RegisterForm from '../components/Register/RegisterForm'
import CombinedNavbars from '../components/Register/Navbar'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'


function Register() {
  const [loading, setLoading] = useState(false); 

  const handleLoadingChange = (newLoadingState) => {
    setLoading(newLoadingState);
  };
  
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