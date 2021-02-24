import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserProfile.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function UserProfile() {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const history = useHistory();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/${auth.userId}`
        );
        setLoadedUsers(responseData.users[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [sendRequest]);
  return (
    <>
      {!isLoading && loadedUsers ? (
        <Card className="authentication user-prof-card">
          <div className={`${classes.root} user-head`}>
            <Avatar
              alt="picture"
              src={`${process.env.REACT_APP_BACKEND_URL}/${loadedUsers.picture}`}
              className={classes.large}
            />
            <h2>Mes informations</h2>
          </div>

          <div className="data-user-profile">
            <div className="form-group-data">
              <label>Pseudo: </label>
              <h4>{loadedUsers.pseudo}</h4>
            </div>
            <div className="form-group-data">
              <label>Nom: </label>
              <h4>{loadedUsers.name}</h4>
            </div>
            <div className="form-group-data">
              <label>Prenom: </label>
              <h4>{loadedUsers.firstname}</h4>
            </div>
            <div className="form-group-data">
              <label>Email: </label>
              <h4>{loadedUsers.email}</h4>
            </div>
            <div className="form-group-data">
              <label>Role: </label>
              {loadedUsers.role[0].name === 'user' ? (
                <h4 className="color-role">Standard</h4>
              ) : (
                <h4 className="color-role">{loadedUsers.role[0].name}</h4>
              )}
            </div>
            <div className="form-group-data">
              <label>Tabs: </label>
              <h4>{loadedUsers.tabs.length}</h4>
            </div>
            <div className="form-group-data">
              <label>Tutoriels: </label>
              <h4>{loadedUsers.tutorials.length}</h4>
            </div>
          </div>
        </Card>
      ) : (
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="circle" width={80} height={80} />
          <Skeleton variant="rect" width={500} height={500} />
        </div>
      )}
    </>
  );
}

export default UserProfile;
