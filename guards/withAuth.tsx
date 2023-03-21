import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { client } from "../configs/axios/axiosConfig"
import { UserContext } from "../contexts/user/UserContext"
import { Account, User } from "../interfaces/auth/user.interface"

export const withAuth = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)
    const { token } = useContext(UserContext)

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
    }, [token])

    return user ? <Component /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}

export const withEventOrganizerGuard = (
  Component: React.ComponentType<any>
) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)
    const { token } = useContext(UserContext)

    useEffect(() => {
      if (user) return
      const getUser = async () => {
        try {
          const response = await client.get<User>("user")
          const userData = response.data
          if (!userData || userData.accountType !== Account.EVENT_ORGANIZER) {
            router.push("/auth/login")
          } else {
            setUser(userData)
          }
        } catch (error) {
          router.push("/auth/login")
        }
      }
      getUser()
    }, [token])

    return user ? <Component /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}

export const withCustomerGuard = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = () => {
    const router = useRouter()
    const { user, setUser } = useContext(UserContext)
    const { token } = useContext(UserContext)

    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await client.get<User>("user")
          const userData = response.data
          if (!userData || userData.accountType !== Account.CUSTOMER) {
            router.push("/auth/login")
          } else {
            setUser(userData)
          }
        } catch (error) {
          router.push("/auth/login")
        }
      }
      getUser()
    }, [token])

    return user ? <Component /> : null // Render whatever you want while the authentication occurs
  }

  return AuthenticatedComponent
}
