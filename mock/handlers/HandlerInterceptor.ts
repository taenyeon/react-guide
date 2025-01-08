import { delay, http, HttpResponse, StrictResponse } from 'msw'

const unauthorized: () => StrictResponse<null> = () => HttpResponse.json(null, { status: 401 })

const isAuthorizationRequired = (targetUrl: string) => {
  return unauthorizedUrls.find(url => url.includes(targetUrl)) != null
}

const unauthorizedUrls = ['/login', '/src']

const HandlerInterceptor = http.all('*', async ({ request }) => {
  // delay
  await delay(300)

  // authorization interceptor
  if (isAuthorizationRequired(request.url)) {
    console.error('url', request.url)
    if (request.headers.get('authorization') != 'testToken') return unauthorized()
  }
})

export default HandlerInterceptor
