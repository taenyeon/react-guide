import UserInfo from "./UserInfo.ts"

export type Authorization = {
    isAuthorized: boolean
    userInfo: UserInfo | null
}

export default Authorization