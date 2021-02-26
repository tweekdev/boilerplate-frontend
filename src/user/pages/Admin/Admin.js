import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import DifficultiesList from '../../components/ListAdmin/ListDifficulty';
import InstrumentList from '../../components/ListAdmin/ListInstrument';
import TypesList from '../../components/ListAdmin/ListType';
import NewDifficulty from '../../components/new/NewDifficulty';
import NewInstrument from '../../components/new/NewInstrument';
import NewType from '../../components/new/NewType';
import TabsList from '../../components/TabsList';
import TutorialsList from '../../components/TutorialsList';
import UsersList from '../../components/UsersList';
import './../Users.css';
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
        <Box p={3}>
          <Typography>{children}</Typography>
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
  const [loadedTutorials, setLoadTutorials] = useState();
  const [loadedTutorialsLast, setLoadTutorialsLast] = useState(); //
  const [loadedTabs, setLoadTabs] = useState();
  const [loadedTabsLast, setLoadTabsLast] = useState();
  const [loadedInstruments, setLoadedInstruments] = useState();
  const [loadedTypes, setLoadTypes] = useState();
  const [loadedDifficulties, setLoadedDifficulties] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setLoadUsers(responseData.users);
      } catch (err) {}
    };
    const fetchUsersLast = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/last`
        );
        setLoadUsersLast(responseData.users);
      } catch (err) {}
    };

    const fetchDifficulties = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/difficulties`
        );
        setLoadedDifficulties(responseData.difficulties);
      } catch (err) {}
    };
    const fetchInstruments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/instruments`
        );
        setLoadedInstruments(responseData.instruments);
      } catch (err) {}
    };
    const fetchTutorials = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tutorials`
        );
        setLoadTutorials(responseData.tutorials);
      } catch (err) {}
    };
    const fetchTutorialsLast = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tutorials/last`
        );
        setLoadTutorialsLast(responseData.tutorials);
      } catch (err) {}
    };
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs`
        );
        setLoadTabs(responseData.tabs);
      } catch (err) {}
    };
    const fetchTabsLast = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/last`
        );
        setLoadTabsLast(responseData.tabs);
      } catch (err) {}
    };
    const fetchTypes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/types`
        );
        setLoadTypes(responseData.types);
      } catch (err) {}
    };
    fetchUsers();
    fetchUsersLast();
    fetchTabs();
    fetchTabsLast();
    fetchInstruments();
    fetchTutorials();
    fetchTutorialsLast();
    fetchTypes();
    fetchTypes();
    fetchDifficulties();
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
              <Tab label="Tutoriels" {...a11yProps(2)} />
              <Tab label="Tabs" {...a11yProps(3)} />
              <Tab label="Autres" {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          {isLoading ? (
            <div className="center">
              <LoadingSpinner></LoadingSpinner>
            </div>
          ) : (
            <>
              <TabPanel value={value} index={0}>
                {!isLoading &&
                  loadedTutorialsLast &&
                  loadedTabsLast &&
                  loadedUsersLast && (
                    <Dashboard
                      tabs={loadedTabsLast}
                      users={loadedUsersLast}
                      tutorials={loadedTutorialsLast}
                    />
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
              <TabPanel value={value} index={2}>
                <div className="add-new-container">
                  <Link to={'/tutorial/new'}>
                    <AddIcon></AddIcon>
                  </Link>
                </div>
                {!isLoading && loadedTutorials && (
                  <TutorialsList tutorials={loadedTutorials} />
                )}
              </TabPanel>
              <TabPanel value={value} index={3}>
                <div className="add-new-container">
                  <Link to={'/tabs/new'}>
                    <AddIcon></AddIcon>
                  </Link>
                </div>
                {!isLoading && loadedTabs && <TabsList tabs={loadedTabs} />}
              </TabPanel>
              <TabPanel value={value} index={4}>
                <div className="add-new-container">
                  <NewInstrument />
                  <NewType />
                  <NewDifficulty />
                </div>

                <div className="autres-content">
                  {!isLoading && loadedInstruments && (
                    <InstrumentList instruments={loadedInstruments} />
                  )}
                  {!isLoading && loadedTypes && (
                    <TypesList types={loadedTypes} />
                  )}
                  {!isLoading && loadedDifficulties && (
                    <DifficultiesList difficulties={loadedDifficulties} />
                  )}
                </div>
              </TabPanel>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
