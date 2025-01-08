import UserInfo from '@typings/UserInfo'

export type Authorization = {
  isAuthorized: boolean
  userInfo: UserInfo | null
}

export default Authorization
