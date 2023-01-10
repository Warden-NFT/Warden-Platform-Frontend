import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Box maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu-button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'grid', width: '100px', placeItems: 'center' }}>
              <Typography>WARDEN</Typography>
            </Box>
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
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <NavLink route={route} />
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ display: 'grid', width: '100px', placeItems: 'center' }}>
              <Typography>WARDEN</Typography>
            </Box>
            {APP_ROUTES.map((route, i) => (
              <NavLink route={route} key={i} />
            ))}
          </Box>
          <ConnectWalletButton />
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default NavBar;
