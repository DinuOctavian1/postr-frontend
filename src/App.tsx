import Page from 'components/Page';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const App = (): JSX.Element => {
  return (
    <Page>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Page>
  );
};
export default App;
