import { ComponentType, FC, useContext } from "react"
import { UserContext } from "../contexts/user/UserContext"
import { getCookie } from "../utils/cookie/cookieHandler"

function withUserGuard<P>(Component: ComponentType<P>): FC<P> {
  return function WithUserGuard(props: P) {
    const { user, redirectToHome } = useContext(UserContext)
    if (!user || getCookie("token") === undefined) {
      console.log("NOT AUTHENTICATED")
      redirectToHome()
      return null
    } else {
      console.log("AUTHENTICATED")
      // @ts-ignore
      return <Component {...props} />
    }
  }
}

export default withUserGuard
