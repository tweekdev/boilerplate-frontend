import React, { useState } from 'react';
import Backdrop from '../UIElements/Backdrop';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import NavLinksLeft from './NavLinksLeft';
import SideDrawer from './SideDrawer';
const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}></Backdrop>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinksLeft />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="main-navigation__header-nav">
          <NavLinks></NavLinks>
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
