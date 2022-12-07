import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
// import '@rainbow-me/rainbowkit/styles.css';
import ConnectWalletButton from './ConnectWalletButton';
import NavLink from './NavLink';
import MenuIcon from '@mui/icons-material/Menu';

const APP_ROUTES = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Marketplace',
    url: '/marketplace',
  },
  {
    name: 'Generate',
    url: '/generate',
  },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Box maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {APP_ROUTES.map((route, i) => (
                <>
                  <MenuItem key={i} onClick={handleCloseNavMenu}>
                    <NavLink route={route} />
                  </MenuItem>
                </>
              ))}
            </Menu>
          </Box>
          <Box display="grid" width="100px">
            <Tooltip title="Home">
              <Typography>WARDEN</Typography>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {APP_ROUTES.map((route, i) => (
              <NavLink route={route} key={i} />
            ))}
          </Box>
          <ConnectWalletButton />


          <Box sx={{ flexGrow: 0 }}>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {APP_ROUTES.map((route, i) => (
                <MenuItem key={i} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{route.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default NavBar;
