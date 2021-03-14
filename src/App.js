import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftNavigation from './shared/components/Navigation/LeftNavigation';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import ForgotPassword from './containers/Auth/ForgotPassword';
import Profile from './containers/Profile/Profile';
import ResetPassword from './containers/Auth/ResetPassword';

const Home = React.lazy(() => import('./containers/Home/Home'));
const Admin = React.lazy(() => import('./containers/Admin/Admin'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Signup = React.lazy(() => import('./containers/Auth/Signup'));

const UpdateUser = React.lazy(() => import('./containers/Profile/UpdateUser'));
const App = () => {
  const { token, login, logout, userId, isAdmin } = useAuth();
  let routes;

  if (token && isAdmin) {
    //admin
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/profil" exact>
          <Profile/>
        </Route>
        <Route path="/Admin" exact>
          <Admin />
        </Route>
        <Route path="/users/edit/:uid" exact>
          <UpdateUser />
        </Route>
        <Redirect to="/admin" />
      </Switch>
    );
  } else if (token && !isAdmin) {
    //User
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/profil" exact>
          <Profile/>
        </Route>
        <Route path="/users/edit/:uid" exact>
          <UpdateUser />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home/>
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
          isAdmin: isAdmin,
      }}
    >
      <ToastContainer />
      <Router>
        <div className="container-page">
          <div className="nav-left">
            <LeftNavigation />
          </div>
          <div className="content-right">
            <MainNavigation />
            <main>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner/>
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
