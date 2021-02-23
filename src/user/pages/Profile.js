import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './Profile.css';
import TabsProfile from './TabsProfile';
import TutorialsProfile from './TutorialsProfile';
import UpdateUser from './UpdateUser';
import UserProfile from './UserProfile';

toast.configure();

function TabPanel(props) {
  const location = useLocation();
  const { children, value, index, ...other } = props;
  if (location.success === 'success') {
    toast.success('🦄 Success!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
          <div className="container-profile box">
            <div className="box-row">
              <UserProfile className="box-cell" />
              <UpdateUser className="box-cell" />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TabsProfile />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TutorialsProfile />
        </TabPanel>
      </div>
    </div>
  );
}

export default Profile;
