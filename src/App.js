import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Instruments from './instruments/pages/Instruments';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import NewTabs from './tabs/pages/NewTabs';
import NewTutorial from './tutorials/pages/NewTutorial';

const Home = React.lazy(() => import('./shared/components/Home'));
const Tabs = React.lazy(() => import('./tabs/pages/Tabs'));
const Tab = React.lazy(() => import('./tabs/pages/Tab'));
const Tutorials = React.lazy(() => import('./tutorials/pages/Tutorials'));
const Tutorial = React.lazy(() => import('./tutorials/pages/Tutorial'));
const NewInstrument = React.lazy(() =>
  import('./instruments/pages/NewInstrument')
);
const UpdateProject = React.lazy(() =>
  import('./projects/pages/UpdateProject')
);
const Admin = React.lazy(() => import('./user/pages/Admin'));
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
        <Route path="/tutorial/new" exact>
          <NewTutorial></NewTutorial>
        </Route>
        <Route path="/tutorial/:tutorialId">
          <Tutorial></Tutorial>
        </Route>
        <Route path="/instruments" exact>
          <Instruments></Instruments>
        </Route>
        <Route path="/instruments/new" exact>
          <NewInstrument></NewInstrument>
        </Route>
        <Route path="/instruments/:iid" exact>
          <div>id</div>
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
        <Route path="/tabs/:tabsId">
          <UpdateProject />
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
        <Route path="/tutorial/:tutorialId">
          <Tutorial></Tutorial>
        </Route>
        <Route path="/Instruments" exact>
          <Instruments></Instruments>
        </Route>
        <Route path="/tabs/:tabsId">
          <UpdateProject />
        </Route>
        <Redirect to="/users" />
        <Redirect to={`/users/profile/${userId}`} />
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
        <Route path="/tab/:tabsId">
          <Tab></Tab>
        </Route>
        <Route path="/tutorial" exact>
          <Tutorials></Tutorials>
        </Route>
        <Route path="/tutorial/:tutorialId">
          <Tutorial></Tutorial>
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
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
      <Router>
        <MainNavigation />
        <main>
          <svg
            className="wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 200"
          >
            <path
              fill="#000639"
              fillOpacity="0.4"
              d="M0,140 C150, 200 350, 0 500, 200 L700, 00 L0,10 Z"
            ></path>
            <path
              fill="#000639"
              fillOpacity="0.6"
              d="M0,110 C150, 200 350, 0 500, 150 L500, 00 L0,0 Z"
            ></path>
            <path
              fill="#000639"
              fillOpacity="1"
              d="M0,100 C150, 200 350, 0 500, 100 L500, 00 L0,0 Z"
            ></path>
          </svg>
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
      </Router>
    </AuthContext.Provider>
  );
};
export default App;
