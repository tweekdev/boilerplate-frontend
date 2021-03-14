import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinksLeft.css';
const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links-left">
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink className="links" to="/">
              <DashboardIcon className="icon-header"/> Explore
            </NavLink>
          </li>
        </>
      )}
      {auth.isLoggedIn && auth.role === '601724ea6f33a7db18a485c5' && (
        <div className="instrument-left">
          Administration
          <li>
            <NavLink className="links" to="/admin" exact>
              <SupervisorAccountIcon className="icon-header"/>
              Panel Admin
            </NavLink>
          </li>
        </div>
      )}
      {!auth.isLoggedIn && (
        <>
          <li>
            <NavLink className="links" to="/">
              <DashboardIcon className="icon-header"/> Explore
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
