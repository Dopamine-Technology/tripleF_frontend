import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import { Route, BrowserRouter as Router, Routes , Navigate} from "react-router-dom";
import React,{useContext, useEffect,useState} from 'react';
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
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Test from './components/Opportunities/Test';
import WholeProfile from './components/Profile/TalentProfile/WholeProfile';
import NotFound from './pages/NotFound';
import SettingsLayout from './components/Settings/SettingsLayout';
import MyAccount from './components/Settings/MyAccount';
import ChangePassword from './components/Settings/ChangePassword';
import Notification from './components/Settings/Notification';
import ProfilesApplied from './components/Opportunities/ProfilesApplied';
import NotificationList from './components/Notification/NotificationList';
import SearchAccounts from './components/SearchAccounts/SearchAccounts';
import {io} from 'socket.io-client';
import ChatBox from './components/Chat/ChatBox';



function App() {
  const { user } = useContext(UserDataContext);
  const checkRole = useRoleCheck();

  return (
    <div className="App">
       <Router>
      
        <Routes>
        {user.isAuthenticated ? (
            <>
          <Route path='/' element={<Layout  />}>
          <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />}  />
            <Route path='/view/post/:id' element={<PostView />}  />
            <Route path='/clubs' element={<ComingSoon />}  />
            <Route path='/Scouts' element={<ComingSoon />}  />
            <Route path='/Opportunities' element={<ComingSoon />}  />
            <Route path='/challenges' element={<ComingSoon />}  />
            <Route path='/saved' element={<Home />}  />
            <Route path='/view/post/:id' element={<PostView />}  />
      
            <Route path='/loading' element={<LoadingScreen />}  />
          </Route>
          <Route path='/' element={<LayoutWithoutRight />}>
          <Route path='/opportunity/list' element={<OpportunityList />} />
            <Route path='/applied/list' element={<MyOpportunities />} />
            <Route path='/profiles/applied/:name/:id' element={<ProfilesApplied />}  />
            <Route path='/:type/profiles/list' element={<SearchAccounts />}  />
          
           </Route>
           <Route path='/' element={<SettingsLayout />}>
           <Route path='/settings/myAccount' element={<MyAccount />} />
           <Route path='/settings/changePassword' element={<ChangePassword />} />
           <Route path='/settings/ControlNofification' element={<Notification />} />
           </Route>
           {checkRole(["scout","coach","club"]) && (
          <Route path='home/add/opportunity' element={<NewOpportunity />}  />
          )}
          <Route path='/my/notifications' element={<NotificationList />}  />
          {/* <Route path='/profile' element={<WholeProfile />} /> */}
          <Route path='/profile/:id' element={<WholeProfile />} />
          <Route path='/test' element={<Test />}  />
          <Route path='/chatBox' element={<ChatBox />}  />
          
   
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
      
      <Route path='*' element={<NotFound />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
