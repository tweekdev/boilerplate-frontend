import React, { useState } from 'react';
import Backdrop from '../UIElements/Backdrop';
import './LeftNavigation.css';
import MainHeaderLeft from './MainHeaderLeft';
import NavLinksLeft from './NavLinksLeft';
const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}

      <MainHeaderLeft>
        <nav className="main-navigation__header-nav">
          <NavLinksLeft></NavLinksLeft>
        </nav>
      </MainHeaderLeft>
    </>
  );
};

export default MainNavigation;
