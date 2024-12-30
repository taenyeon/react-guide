import {delay, http, HttpResponse} from "msw";
import {Token} from "../src/types/Token";
import UserInfo from "../src/types/UserInfo.ts";

const unAuthorized = () => HttpResponse.json(null, {status: 401});

const unAuthorizedUrls = ['/login', "/src"]

const handlers = [
    http.all('*', async ({request}) => {
        await delay(300)

        if (!request.url.search(unAuthorizedUrls)) {
            console.error("url", request.url)
            if (request.headers.get("authorization") != 'testToken') return unAuthorized();
        }

    }),
    http.post<never, { username: string, password: string }, Token>
    ('/login', async ({request}) => {
        const {username, password} = await request.json();
        if (username != 'test' || password != 'test')
            return HttpResponse.json(null, {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return HttpResponse.json({
                accessToken: "testToken",
                refreshToken: "testToken"
            },
            {
                status: 200
            }
        )
    }),

    http.get<never, never, never>('/logout', async () => {
        return HttpResponse.json(null, {status: 200})
    }),

    http.get<never, never, UserInfo>('/user', async ({request}) => {

        if (request.headers.get("authorization") == 'testToken') {
            return HttpResponse.json({
                name: 'test',
                username: 'test',
            }, {status: 200})
        }
        return unAuthorized();
    }),

]

export default handlers