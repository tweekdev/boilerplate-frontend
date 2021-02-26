import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Instruments from './instruments/pages/Instruments';
import LeftNavigation from './shared/components/Navigation/LeftNavigation';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import NewTabs from './tabs/pages/NewTabs';
import NewTutorial from './tutorials/pages/NewTutorial';
import EditDifficulty from './user/pages/Admin/Edit/EditDifficulty';
import EditInstrument from './user/pages/Admin/Edit/EditInstrument';
import EditType from './user/pages/Admin/Edit/EditType';
import ForgotPassword from './user/pages/ForgotPassword';
import Profile from './user/pages/Profile';
import ResetPassword from './user/pages/ResetPassword';

const Home = React.lazy(() => import('./shared/components/Home'));
const Tabs = React.lazy(() => import('./tabs/pages/Tabs'));
const Tab = React.lazy(() => import('./tabs/pages/Tab'));
const Tutorials = React.lazy(() => import('./tutorials/pages/Tutorials'));
const Tutorial = React.lazy(() => import('./tutorials/pages/Tutorial'));
const Instrument = React.lazy(() => import('./instruments/pages/Instrument'));
const NewInstrument = React.lazy(() =>
  import('./user/components/new/NewInstrument')
);
const UpdateTabs = React.lazy(() => import('./tabs/pages/UpdateTabs'));
const UpdateTutorial = React.lazy(() =>
  import('./tutorials/pages/UpdateTutorial')
);
const Admin = React.lazy(() => import('./user/pages/Admin/Admin'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const Signup = React.lazy(() => import('./user/pages/Signup'));

const UpdateUser = React.lazy(() => import('./user/pages/UpdateUser'));
const App = () => {
  const { token, login, logout, userId, role } = useAuth();
  let routes;

  if (token && role === '601724ea6f33a7db18a485c5') {
    //admin
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/tabs" exact>
          <Tabs></Tabs>
        </Route>
        <Route path="/tutorial" exact>
          <Tutorials></Tutorials>
        </Route>
        <Route path="/profil" exact>
          <Profile></Profile>
        </Route>
        <Route path="/tutorial/new" exact>
          <NewTutorial></NewTutorial>
        </Route>
        <Route path="/tutorial/:tutorialId">
          <Tutorial></Tutorial>
        </Route>
        <Route path="/tutorials/edit/:tutoId">
          <UpdateTutorial />
        </Route>
        <Route path="/instruments" exact>
          <Instruments></Instruments>
        </Route>
        <Route path="/instruments/new" exact>
          <NewInstrument></NewInstrument>
        </Route>
        <Route path="/instruments/:iid" exact>
          <Instrument />
        </Route>
        <Route path="/Admin" exact>
          <Admin />
        </Route>
        <Route path="/tabs/new" exact>
          <NewTabs />
        </Route>
        <Route path="/tab/:tabsId">
          <Tab></Tab>
        </Route>
        <Route path="/tabs/edit/:tabsId">
          <UpdateTabs />
        </Route>
        <Route path="/types/edit/:typeId">
          <EditType />
        </Route>
        <Route path="/instruments/edit/:instrumentId">
          <EditInstrument />
        </Route>
        <Route path="/difficulties/edit/:difficultyId">
          <EditDifficulty />
        </Route>

        <Route path="/users/edit/:uid" exact>
          <UpdateUser />
        </Route>
        <Redirect to="/admin" />
      </Switch>
    );
  } else if (token && role === '601727566f33a7db18a485c6') {
    //user
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/tabs" exact>
          <Tabs></Tabs>
        </Route>
        <Route path="/tutorial" exact>
          <Tutorials></Tutorials>
        </Route>
        <Route path="/profil" exact>
          <Profile></Profile>
        </Route>
        <Route path="/tutorial/new" exact>
          <NewTutorial></NewTutorial>
        </Route>
        <Route path="/tutorial/:tutorialId">
          <Tutorial></Tutorial>
        </Route>
        <Route path="/instruments/:iid" exact>
          <Instrument />
        </Route>
        <Route path="/tabs/new" exact>
          <NewTabs />
        </Route>
        <Route path="/tab/:tabsId">
          <Tab></Tab>
        </Route>
        <Route path="/users/edit/:uid" exact>
          <UpdateUser />
        </Route>
        <Route path="/tabs/edit/:tabsId">
          <UpdateTabs />
        </Route>
        <Route path="/tutorials/edit/:tutoId">
          <UpdateTutorial />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/tabs" exact>
          <Tabs></Tabs>
        </Route>
        <Route path="/tutorial" exact>
          <Tutorials></Tutorials>
        </Route>
        <Route path="/profil" exact>
          <Profile></Profile>
        </Route>
        <Route path="/tutorial/:tutorialId">
          <Tutorial></Tutorial>
        </Route>
        <Route path="/instruments" exact>
          <Instruments></Instruments>
        </Route>
        <Route path="/instruments/:iid" exact>
          <Instrument />
        </Route>
        <Route path="/tab/:tabsId">
          <Tab></Tab>
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/resetPassword/:tokenId">
          <ResetPassword />
        </Route>
        <Route path="/forgotpassword" exact>
          <ForgotPassword />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        role: role,
      }}
    >
      <ToastContainer />
      <Router>
        <div className="container-page">
          <svg
            className="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 200"
          >
            <path
              fill="#141739"
              fillOpacity="0.4"
              d="M0,140 C150, 200 350, 0 500, 200 L700, 00 L0,10 Z"
            ></path>
            <path
              fill="#141739"
              fillOpacity="0.6"
              d="M0,110 C150, 200 350, 0 500, 150 L500, 00 L0,0 Z"
            ></path>
            <path
              fill="#141739"
              fillOpacity="1"
              d="M0,100 C150, 200 350, 0 500, 100 L500, 00 L0,0 Z"
            ></path>
          </svg>
          <div className="nav-left">
            <LeftNavigation />
          </div>
          <div className="content-right">
            <MainNavigation />
            <main>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner></LoadingSpinner>
                  </div>
                }
              >
                {routes}
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
