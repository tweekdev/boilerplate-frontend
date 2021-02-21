import React from 'react';
import './MainHeaderLeft.css';

const MainHeader = (props) => {
  return <header className="main-header-left"> {props.children} </header>;
};

export default MainHeader;
