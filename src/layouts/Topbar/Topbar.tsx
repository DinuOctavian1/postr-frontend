import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import NavItem from './NavItem';

const navItems = [
    {
        title: 'Home',
        to: '/',
    },
    {
        title: 'About',
        to: '/about',
    },
    {
        title: 'Contact',
        to: '/contact',
    },
];

const Topbar = () => {
    return (
        <AppBar>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography variant='h6'>POSTR</Typography>
                <Box display={'inline-flex'}>
                    {navItems.map((item) => (
                        <NavItem key={item.title} title={item.title} />
                    ))}
                </Box>
                <Box>
                    <Button variant='contained' size='medium'>
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
