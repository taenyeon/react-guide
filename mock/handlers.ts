import {http, HttpResponse} from "msw";
import {Token} from "../src/types/Token";

const unAuthorized = () => HttpResponse.json(null, {status: 401});

const handlers = [
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

    http.get<never, never, never>('/logout', async ({request}) => {
        if (request.headers.get("authorization") != 'testToken') return unAuthorized();
        return HttpResponse.json(null, {status: 200})
    }),

]

export default handlers