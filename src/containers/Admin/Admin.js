import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import UsersList from '../User/components/UsersList';
import '../User/pages/Users.css';
import './Admin.css';
import Dashboard from './Dashboard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const Admin = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loadedUsers, setLoadUsers] = useState();
  const [loadedUsersLast, setLoadUsersLast] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`/api/tweektabs/users`);
        setLoadUsers(responseData.users);
      } catch (err) {}
    };
    const fetchUsersLast = async () => {
      try {
        const responseData = await sendRequest(
          `/api/tweektabs/users/last-seven`
        );
        setLoadUsersLast(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
    fetchUsersLast();

  }, [sendRequest]);
  const userDeletedHandler = (deletedUserId) => {
    setLoadUsers((prevUser) =>
      prevUser.filter((user) => user.id !== deletedUserId)
    );
  };

  return (
    <div className="main-admin">
      <ErrorModal error={error} onClear={clearError} />

      <div className="user">
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Infos" {...a11yProps(0)} />
              <Tab label="Utilisateurs" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          {isLoading ? (
            <div className="center">
              <LoadingSpinner/>
            </div>
          ) : (
            <>
              <TabPanel value={value} index={0}>
                {!isLoading &&
                  loadedUsersLast && (
                    <div>
                      <Dashboard
                        users={loadedUsersLast}
                      />
                    </div>
                  )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {!isLoading && loadedUsers && (
                  <UsersList
                    onDeleteUser={userDeletedHandler}
                    users={loadedUsers}
                  />
                )}
              </TabPanel>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
