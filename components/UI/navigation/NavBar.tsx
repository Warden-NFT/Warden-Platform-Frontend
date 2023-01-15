import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import React, { MouseEvent, useState } from 'react'
import ConnectWalletButton from './ConnectWalletButton'
import NavLink from './NavLink'
import { APP_ROUTES } from '../../../constants/general/routes'
import Image from 'next/image'
import Link from 'next/link'

function NavBar() {
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null)

  function handleOpenMenu(e: MouseEvent<HTMLElement>) {
    setMenuElement(e.currentTarget)
  }

  function handleCloseMenu() {
    setMenuElement(null)
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Box maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            <Link href="/">
              <Box
                sx={{
                  display: 'grid',
                  width: '100px',
                  placeItems: 'center',
                  marginRight: 4
                }}
              >
                <Image
                  src="/images/logo/WardenDark.svg"
                  width={100}
                  height={40}
                  alt="logo"
                />
              </Box>
            </Link>
            {/* Home */}
            <NavLink route={APP_ROUTES[0]} />
            {/* Marketplace */}
            <NavLink route={APP_ROUTES[1]} />
            {/* Create */}
            <Button
              variant="text"
              id="oned-button"
              aria-controls={menuElement ? 'create-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuElement ? 'true' : undefined}
              onClick={handleOpenMenu}
              sx={{
                fontWeight: '600',
                borderRadius: 20,
                paddingX: 2,
                '&:hover': {
                  backgroundColor: 'white'
                }
              }}
            >
              CREATE
            </Button>
            <Menu
              id="create-menu"
              aria-labelledby="create-menu-button"
              anchorEl={menuElement}
              open={Boolean(menuElement)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
            >
              {/* Event */}
              <MenuItem onClick={handleCloseMenu}>
                <NavLink route={APP_ROUTES[2].subroutes[0]} />
              </MenuItem>
              {/* Ticket */}
              <MenuItem onClick={handleCloseMenu}>
                <NavLink route={APP_ROUTES[2].subroutes[1]} />
              </MenuItem>
            </Menu>
          </Box>
          <ConnectWalletButton />
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default NavBar
