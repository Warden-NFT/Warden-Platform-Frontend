import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar
} from '@mui/material'
import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import ConnectWalletButton from './ConnectWalletButton'
import NavLink from './NavLink'
import {
  APP_ROUTES,
  EVENT_ORGANIZER_APP_ROUTES,
  CUSTOMER_APP_ROUTES,
  AppRoute
} from '../../../constants/general/routes'
import Image from 'next/image'
import Link from 'next/link'
import { UserContext } from '../../../contexts/user/UserContext'
import { Account } from '../../../interfaces/auth/user.interface'

function NavBar() {
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null)
  const [avatarElement, setAvatarElement] = useState<HTMLElement | null>(null)
  const [appRoutes, setAppRoutes] = useState<AppRoute[]>(APP_ROUTES)
  const { user, logOut } = useContext(UserContext)

  const handleOpenMenu = (e: MouseEvent<HTMLElement>) => {
    setMenuElement(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setMenuElement(null)
  }

  const handleOpenUserMenu = (e: MouseEvent<HTMLElement>) => {
    setAvatarElement(e.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAvatarElement(null)
  }

  const handleLogout = () => {
    handleCloseUserMenu()
    logOut()
  }

  useEffect(() => {
    switch (user?.accountType) {
    case Account.Customer:
      setAppRoutes(CUSTOMER_APP_ROUTES)
      break
    case Account.EventOrganizer:
      setAppRoutes(EVENT_ORGANIZER_APP_ROUTES)
      break
    default:
      setAppRoutes(APP_ROUTES)
    }
  }, [user])

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
            {appRoutes.map((appRoute, index) => {
              if (appRoute.subroutes.length) return null
              return <NavLink route={appRoute} key={index} />
            })}
            {user?.accountType === Account.EventOrganizer && (
              <>
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
                    <NavLink route={appRoutes[2].subroutes[0]} />
                  </MenuItem>
                  {/* Ticket */}
                  <MenuItem onClick={handleCloseMenu}>
                    <NavLink route={appRoutes[2].subroutes[1]} />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex' }}>
            {user ? (
              <Avatar
                sx={{
                  marginRight: 1,
                  bgcolor: '#000',
                  '&:hover': { cursor: 'pointer' }
                }}
                onClick={handleOpenUserMenu}
                aria-controls={avatarElement ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={avatarElement ? 'true' : undefined}
              >
                {user?.username && user?.username[0]}
              </Avatar>
            ) : (
              <NavLink route={{ name: 'Log in', url: '/auth/login' }} />
            )}
            <Menu
              id="user-menu"
              aria-labelledby="user-menu-button"
              anchorEl={avatarElement}
              open={Boolean(avatarElement)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
            <ConnectWalletButton />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default NavBar
