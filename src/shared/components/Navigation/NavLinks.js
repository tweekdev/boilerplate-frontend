import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import './NavLinks.css';
import SimpleMenu from './SimpleMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const NavLinks = (props) => {
  const { sendRequest } = useHttpClient();
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const [user, setUser] = useState();
  const userId = auth.userId;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (userId !== false) {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/users/user/${auth.userId}`
          );
          setUser(responseData.users[0]);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth.userId, userId]);
  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">
            <button className="button--inverse auth-button">
              Se connecter
            </button>
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          {user && (
            <div className={classes.root}>
              <Avatar
                alt="profile-picture"
                src={`${process.env.REACT_APP_BACKEND_URL}/${user.picture}`}
              />

              <SimpleMenu logout={auth.logout} pseudo={user.pseudo}>
                {user.pseudo}
              </SimpleMenu>
            </div>
          )}
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
