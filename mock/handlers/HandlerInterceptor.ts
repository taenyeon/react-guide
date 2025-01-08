import { delay, http, HttpResponse, StrictResponse } from 'msw'

const unAuthorized: () => StrictResponse<null> = () => HttpResponse.json(null, { status: 401 })

const requiredAuthorization = (targetUrl: string) => {
  return unAuthorizedUrls.find(url => url.includes(targetUrl)) != null
}

const unAuthorizedUrls = ['/login', '/src']

const HandlerInterceptor = http.all('*', async ({ request }) => {
  await delay(300)

  if (requiredAuthorization(request.url)) {
    console.error('url', request.url)
    if (request.headers.get('authorization') != 'testToken') return unAuthorized()
  }
})

export default HandlerInterceptor
