import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
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

function NavBar() {
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null)
  const [avatarElement, setAvatarElement] = useState<HTMLElement | null>(null)
  const [appRoutes, setAppRoutes] = useState<AppRoute[]>(APP_ROUTES)
  const [boxShadowStyle, setBoxShadowStyle] = useState<string>()
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
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Link href="/">
              <Box
                sx={{
                  display: "grid",
                  width: "100px",
                  placeItems: "center",
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
          </Box>
          <Box sx={{ display: "flex" }}>
            {user ? (
              <Avatar
                sx={{
                  marginRight: 1,
                  bgcolor: "#000",
                  "&:hover": { cursor: "pointer" }
                }}
                onClick={handleOpenUserMenu}
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
