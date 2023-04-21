import { Container, Typography } from '@mui/material';
import Form from './Form';

const Home = (): JSX.Element => {
  return (
    <Container>
      <Typography variant="h2" textAlign={'center'}>
        POSTR
      </Typography>
      <Container>
        <Form />
      </Container>
    </Container>
  );
};

export default Home;
