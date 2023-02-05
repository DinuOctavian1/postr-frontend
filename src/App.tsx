import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
};
export default App;
