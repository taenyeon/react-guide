import { http, HttpResponse } from 'msw'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import { Token } from '@typings/Token'
import { apiCode } from '@utils/error/constant/ApiCode'
import UserInfo from '@typings/UserInfo'

const AuthHandlers = [
  http.post<never, { username: string; password: string }, null | ApiResponse<Token>>(
    '/login',
    async ({ request }) => {
      const { username, password } = await request.json()

      if (username != 'test' || password != 'test')
        return HttpResponse.json(null, {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        })

      return HttpResponse.json(
        new ApiResponse<Token>().build(apiCode.SUCCESS, {
          accessToken: 'testToken',
          refreshToken: 'testToken',
        }),
      )
    },
  ),

  http.get<never, never, ApiResponse<null>>('/logout', async () => {
    return HttpResponse.json(new ApiResponse<null>().build(apiCode.SUCCESS, null))
  }),

  http.get<never, never, ApiResponse<UserInfo>>('/user', async ({ request }) => {
    if (request.headers.get('authorization') != 'testToken') {
      return HttpResponse.json(new ApiResponse<UserInfo>().build(apiCode.NOT_FOUND_ERROR, null))
    }
    return HttpResponse.json(
      new ApiResponse<UserInfo>().build(apiCode.SUCCESS, {
        name: 'test',
        username: 'test',
      }),
    )
  }),
]

export default AuthHandlers
