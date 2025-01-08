import { delay, http, HttpResponse, StrictResponse } from 'msw'
import { Token } from '@typings/Token'
import UserInfo from '@typings/UserInfo'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import { apiCode } from '@utils/error/constant/ApiCode'

const unAuthorized: () => StrictResponse<null> = () => HttpResponse.json(null, { status: 401 })

const requiredAuthorization = (targetUrl: string) => {
  return unAuthorizedUrls.find(url => url.includes(targetUrl)) != null
}

const unAuthorizedUrls = ['/login', '/src']

const handlers = [
  http.all('*', async ({ request }) => {
    await delay(300)

    if (requiredAuthorization(request.url)) {
      console.error('url', request.url)
      if (request.headers.get('authorization') != 'testToken') return unAuthorized()
    }
  }),

  http.post<never, { username: string; password: string }, null | ApiResponse<Token>>('/login', async ({ request }) => {
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
  }),

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

export default handlers
