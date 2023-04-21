import { Box, Button, SxProps } from '@mui/material';

interface IProps {
  title: string;
}

const navItemStyle: SxProps = {
  backgroundColor: 'transparent',
  margin: 'auto',
  marginLeft: '1rem',
  color: 'white',
};

const NavItem = ({ title }: IProps) => {
  return (
    <Box>
      <Button variant="outlined" size="medium" sx={navItemStyle}>
        {title}
      </Button>
    </Box>
  );
};

export default NavItem;
