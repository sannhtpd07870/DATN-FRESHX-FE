import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../components/user/ProfileSidebar';
import AccountInfo from '../components/user/AccountInfo';


const UserLayout = () => {
  return (
    <div>
    {/* <Header/> */}
    {/* <div style={{margin:'80px'}}> */}
      
        <div className="row g-3 gy-md-3" >
          <ProfileSidebar style={{margin:'80px '}}/>
          <AccountInfo/>
          <Outlet />
          </div>
    {/* </div> */}
    {/* <Footer/> */}
    </div>
    

  );
};

export default UserLayout;
