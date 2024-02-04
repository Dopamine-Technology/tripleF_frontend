import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import React,{useContext} from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import VerifyPage from './components/Register/VerifyPage';
import Reset from './components/ResetPassword/Reset';
import NewPassword from './components/ResetPassword/NewPassword';
import { UserDataContext } from './components/UserContext/UserData.context';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import PostView from './components/SharePost/PostView';
import Blogs from './pages/Blogs';
import ComingSoon from './components/ComingSoon/ComingSoon';
import BlogPage from './pages/Blog';
import NewOpportunity from './components/Opportunities/NewOpportunity';
import NavBar from './components/Layout/Navbar';
import OpportunityList from './components/Opportunities/OpportunityList';
import MyOpportunities from './components/Opportunities/MyOpportunities';
import LayoutWithoutRight from './components/Layout/LayoutWithoutRight';
import { useRoleCheck } from './components/Auth/useRoleCheck';

function App() {
  const { user } = useContext(UserDataContext);
  const checkRole = useRoleCheck();

  return (
    <div className="App">
       <Router>
      
        <Routes>
        {user.isAuthenticated ? (
            <>
          <Route path='/' element={<Layout />}>
            <Route path='/home' element={<Home />}  />
            <Route path='/view/post/:id' element={<PostView />}  />
            <Route path='/clubs' element={<ComingSoon />}  />
            <Route path='/Scouts' element={<ComingSoon />}  />
            <Route path='/Opportunities' element={<ComingSoon />}  />
            <Route path='/challenges' element={<ComingSoon />}  />
            <Route path='/saved' element={<ComingSoon />}  />
            <Route path='/view/post/:id' element={<PostView />}  />
      
          </Route>
          <Route path='/' element={<LayoutWithoutRight />}>
          <Route path='/opportunity/list' element={<OpportunityList />} />
            <Route path='/applied/list' element={<MyOpportunities />} />
           </Route>
           {checkRole(["scout","coach","club"]) && (
          <Route path='home/add/opportunity' element={<NewOpportunity />}  />
          )}
          </>
        ):(
          <Route>
          <Route path='/' element={<LandingPage />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<BlogPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify/:token' element={<VerifyPage />} />
          <Route path='/reset-password/' element={<Reset />} />
          <Route path='/reset-password/:user_token' element={<NewPassword />} />
          </Route>
        )}
      

      </Routes>
      </Router>
    </div>
  );
}

export default App;
