import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyPage from './components/Register/VerifyPage';
import Reset from './components/ResetPassword/Reset';
import NewPassword from './components/ResetPassword/NewPassword';

function App() {
  
  return (
    <div className="App">
       <Router>
        <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify/:token' element={<VerifyPage />} />
        <Route path='/reset-password/' element={<Reset />} />
        <Route path='/reset-password/:user_token' element={<NewPassword />}
              />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
