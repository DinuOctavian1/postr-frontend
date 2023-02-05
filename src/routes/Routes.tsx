import { Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from '../views/Home/Home';
import ROUTE from './route';

const Routes = (): JSX.Element => {
    return (
        <ReactRoutes>
            <Route path={ROUTE.Home} element={<Home />} />
        </ReactRoutes>
    );
};

export default Routes;
