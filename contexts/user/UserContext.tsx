import { useRouter } from "next/router"
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDisconnect } from "wagmi"
import { client } from "../../configs/axios/axiosConfig"
import { SuccessfulAuthDTO } from "../../interfaces/auth/auth.interface"
import { Account, User } from "../../interfaces/auth/user.interface"
import { getCookie, setCookie } from "../../utils/cookie/cookieHandler"

interface UserContextStruct {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
  setUserInfo: (value: SuccessfulAuthDTO) => void
  token: string | undefined
  setToken: Dispatch<SetStateAction<string | undefined>>
  logOut: () => void
  getAccountType: () => Account | undefined
  redirectToHome: () => void
}

export const UserContext = createContext({} as UserContextStruct)

const UserContextProvider = ({ ...props }) => {
  const router = useRouter()
  const { disconnect } = useDisconnect()
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string>()

  const setUserInfo = (data: SuccessfulAuthDTO) => {
    setUser(data.user)
    setCookie("token", data.jwt, 30)
    setToken(data.jwt)
  }

  const logOut = () => {
    setUser(undefined)
    setToken("")
    setCookie("token", null, 0)
    disconnect()
  }

  const redirectToHome = () => {
    router.push("/")
  }

  const getAccountType = (): Account | undefined => {
    return user?.accountType
  }

  const getUser = async () => {
    if (!getCookie("token")) return
    const user = await client.get("user")
    if (user) setUser(user.data)
  }

  useEffect(() => {
    try {
      getUser()
    } catch (error) {
      console.log(error)
    }
  }, [token])

  const values: UserContextStruct = {
    user,
    setUser,
    setUserInfo,
    token,
    setToken,
    logOut,
    getAccountType,
    redirectToHome
  }
  return <UserContext.Provider value={values} {...props} />
}

export default UserContextProvider
