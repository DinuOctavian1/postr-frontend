import FacebookSDKWrapper from 'config/FacebookSDKWrapper';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { CreatePost } from 'views/Dashboard/CreatePost';
import EmailConfirmation from 'views/EmailConfirmation/EmailConfirmation';
import Login from 'views/Login';
import Signup from 'views/Signup';
import Home from '../views/Home/Home';
import ROUTE from './route';

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      <Route path={ROUTE.Home} element={<Home />} />
      <Route path={ROUTE.Signup} element={<Signup />} />
      <Route path={ROUTE.EmailConfirmation} element={<EmailConfirmation />} />
      <Route path={ROUTE.Login} element={<Login />} />

      <Route element={<FacebookSDKWrapper />}>
        <Route path={ROUTE.Test} element={<CreatePost />} />
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
