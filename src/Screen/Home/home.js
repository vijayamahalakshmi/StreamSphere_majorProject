import React from 'react';
import './home.css';

import HomePage from '../../Component/HomePage/homePage';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';

const Home = ({ sideNavbar }) => {
  return (
    <div className='home'>
      <SideNavbar sideNavbar={sideNavbar} />
      <div className="mainContent">
        <HomePage sideNavbar={sideNavbar} />
      </div>
    </div>
  );
};

export default Home;
