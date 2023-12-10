import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  
  return (
    <div className="App">
       <Router>
        <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
