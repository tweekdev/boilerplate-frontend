import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Profile.css';
import TabsProfile from './TabsProfile';
import TutorialsProfile from './TutorialsProfile';
import UpdatePassword from './UpdatePassword';
import UpdateUser from './UpdateUser';
import UserProfile from './UserProfile';

toast.configure();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Profile() {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedTabs, setLoadTabs] = useState();
  const [state, setState] = useState();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/tabs/user/${state}`
        );
        setLoadTabs(responseData.tabs);
      } catch (err) {}
    };
    fetchTabs();
  }, [sendRequest, state]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <h1>
        Mon <strong>profil</strong>
      </h1>

      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Informations" {...a11yProps(0)} />
            <Tab label="Mes Tabs" {...a11yProps(1)} />
            <Tab label="Mes Tutos" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {!isLoading && (
            <div className="container-profile box">
              <div className="box-row">
                <UserProfile className="box-cell" />
                <UpdateUser className="box-cell" />
              </div>
              <div className="update-password-box">
                <UpdatePassword className="box-cell" />
              </div>
            </div>
          )}
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!isLoading && <TabsProfile />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {!isLoading && <TutorialsProfile />}
        </TabPanel>
      </div>
    </div>
  );
}

export default Profile;
