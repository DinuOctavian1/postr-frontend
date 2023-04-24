import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Signup from 'views/Signup';
import Home from '../views/Home/Home';
import ROUTE from './route';

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      <Route path={ROUTE.Home} element={<Home />} />
      <Route path={ROUTE.Signup} element={<Signup />} />
    </ReactRoutes>
  );
};

export default Routes;
