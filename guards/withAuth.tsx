import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { UserContext } from "../contexts/user/UserContext"
import { Account, User } from "../interfaces/auth/user.interface"

export const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await client.get("user")
          const userData = response.data
          if (!userData) {
            router.push("/auth/login")
          } else {
            setUser(userData)
          }
        } catch (error) {
          router.push("/auth/login")
        }
      }
      getUser()
    }, [])

    return user ? <Component data={user} /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}

export const withEventOrganizerGuard = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await client.get<User>("user")
          const userData = response.data
          if (!userData || userData.accountType !== Account.EventOrganizer) {
            router.push("/auth/login")
          } else {
            setUser(userData)
          }
        } catch (error) {
          router.push("/auth/login")
        }
      }
      getUser()
    }, [])

    return user ? <Component data={user} /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}

export const withCustomerGuard = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await client.get<User>("user")
          const userData = response.data
          if (!userData || userData.accountType !== Account.EventOrganizer) {
            router.push("/auth/login")
          } else {
            setUser(userData)
          }
        } catch (error) {
          router.push("/auth/login")
        }
      }
      getUser()
    }, [])

    return user ? <Component data={user} /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}
