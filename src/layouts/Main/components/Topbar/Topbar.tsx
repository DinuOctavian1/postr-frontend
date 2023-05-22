import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ThemeModeToggler from 'components/ThemeModeToggler';

import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { NavItem } from './components';
import { Link, useNavigate } from 'react-router-dom';
import ROUTE from 'routes/route';
import { useAtom } from 'jotai';
import state from 'utils/state';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useLogout } from 'hooks';
import apiAgent from 'api/ApiAgent';
import { toast } from 'react-toastify';

interface PageItem {
  href: string;
  title: string;
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: PageItem[];
  colorInvert?: boolean;
}

const Topbar = ({
  onSidebarOpen,
  pages,
  colorInvert = false,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const [user, setUser] = useAtom(state.user);
  //const [user, setUser] = useState<any>(state.user);
  const [logout, isLogged] = useLogout(apiAgent, toast);
  const navigate = useNavigate();

  console.log(user);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="postr"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src={
            mode === 'light' && !colorInvert
              ? 'assets/logo.png'
              : 'assets/logo.png'
          }
          height={0.5}
          width={0.5}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        <Box sx={{ display: 'inline-flex' }}>
          {pages.map((page, i) => (
            <Box marginLeft={4} key={i}>
              <NavItem
                key={i}
                title={page.title}
                id={page.title}
                colorInvert={colorInvert}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {user?.username ? (
        <>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={ROUTE.CreatePost}
            size="large"
          >
            Create Post
          </Button>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user?.username[0].toUpperCase()}
          </Avatar>
          <Box marginLeft={2} display={'inline-flex'}>
            <Box marginRight={5}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  logout();
                  if (!isLogged) {
                    setUser(null);
                    navigate(ROUTE.Home);
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box marginLeft={2}>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={ROUTE.Login}
            size="large"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={ROUTE.Signup}
            size="large"
            sx={{ marginLeft: 5, marginRight: 5 }}
          >
            Sign Up
          </Button>
        </Box>
      )}
      <ThemeModeToggler />

      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
