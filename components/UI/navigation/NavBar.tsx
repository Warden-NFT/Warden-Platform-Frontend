import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar
} from "@mui/material"
import React, { MouseEvent, useContext, useEffect, useState } from "react"
import ConnectWalletButton from "./ConnectWalletButton"
import NavLink from "./NavLink"
import {
  APP_ROUTES,
  EVENT_ORGANIZER_APP_ROUTES,
  CUSTOMER_APP_ROUTES,
  AppRoute
} from "../../../constants/general/routes"
import Image from "next/image"
import Link from "next/link"
import { UserContext } from "../../../contexts/user/UserContext"
import { Account } from "../../../interfaces/auth/user.interface"
import { Menu as MenuIcon } from "@mui/icons-material"

function NavBar() {
  const [avatarElement, setAvatarElement] = useState<HTMLElement | null>(null)
  const [appRoutes, setAppRoutes] = useState<AppRoute[]>(APP_ROUTES)
  const [boxShadowStyle, setBoxShadowStyle] = useState<string>()
  const { user, logOut } = useContext(UserContext)
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {appRoutes.map((route, index) => (
          <Link
            href={route.url}
            key={index}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                {/* <NavLink route={{ name: route.name, url: route.url }} key={index} /> */}
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setDrawerOpen(open)
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
    case Account.CUSTOMER:
      setAppRoutes(CUSTOMER_APP_ROUTES)
      break
    case Account.EVENT_ORGANIZER:
      setAppRoutes(EVENT_ORGANIZER_APP_ROUTES)
      break
    default:
      setAppRoutes(APP_ROUTES)
    }
  }, [user])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80)
        setBoxShadowStyle("1px -4px 10px 7px rgba(212,212,212,0.75)")
      else setBoxShadowStyle("none")
    })
  }, [])

  return (
    <AppBar
      color="transparent"
      elevation={0}
      sx={{
        position: "fixed",
        width: "100%",
        height: "64px",
        background: "rgba(256, 256, 256, 0.9)",
        backdropFilter: "blur(8px)",
        boxShadow: boxShadowStyle,
        transition: "all 0.1s ease",
        overflow: "hidden",
        margin: "0 auto"
      }}
    >
      <Box
        maxWidth="xl"
        sx={{ width: "100vw", maxWidth: "1200px", margin: "0 auto" }}
      >
        <Toolbar sx={{ px: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "row",
              height: "64px"
            }}
          >
            <>
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ display: ["inherit", "inherit", "none"] }}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                {list()}
              </SwipeableDrawer>
            </>
            <Link href="/">
              <Box
                sx={{
                  display: "grid",
                  width: "50px",
                  height: "64px",
                  placeItems: "center",
                  marginRight: [0, 0, 8]
                }}
              >
                <Image
                  src="/images/logo/WardenDark.svg"
                  width={90}
                  height={40}
                  alt="logo"
                />
              </Box>
            </Link>
            <Box sx={{ display: ["none", "none", "inherit", "inherit"] }}>
              {appRoutes.map((appRoute, index) => {
                if (appRoute.subroutes.length) return null
                return (
                  <NavLink
                    route={{ name: appRoute.name, url: appRoute.url }}
                    key={index}
                  />
                )
              })}
            </Box>
          </Box>
          <Box sx={{ display: "flex", margin: 0 }}>
            {user ? (
              <Avatar
                sx={{
                  marginRight: 1,
                  bgcolor: "#000",
                  "&:hover": { cursor: "pointer" }
                }}
                onClick={handleOpenUserMenu}
                src={user.profileImage}
                aria-controls={avatarElement ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={avatarElement ? "true" : undefined}
              >
                {user?.username && user?.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <NavLink route={{ name: "Log in", url: "/auth/login" }} />
            )}
            <Menu
              id="user-menu"
              aria-labelledby="user-menu-button"
              anchorEl={avatarElement}
              open={Boolean(avatarElement)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
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
