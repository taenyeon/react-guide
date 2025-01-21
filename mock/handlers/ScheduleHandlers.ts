import { http, HttpResponse } from 'msw'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import { Schedule } from '@typings/Schedule'
import { apiCode } from '@utils/error/constant/ApiCode'

let schedules = [
  new Schedule({
    id: 1,
    startedAt: '2025/01/06 00:00',
    endedAt: '2025/01/10 23:59',
    title: 'test1',
    contents: 'test1',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 2,
    startedAt: '2025/01/07 07:00',
    endedAt: '2025/01/07 12:30',
    title: 'test2',
    contents: 'test2',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 3,
    startedAt: '2025/01/07 08:00',
    endedAt: '2025/01/07 08:30',
    title: 'test3',
    contents: 'test3',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 4,
    startedAt: '2025/01/05 04:00',
    endedAt: '2025/01/05 23:00',
    title: 'test4',
    contents: 'test4',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 5,
    startedAt: '2025/01/07 04:00',
    endedAt: '2025/01/09 23:59',
    title: 'test5',
    contents: 'test5',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 6,
    startedAt: '2025/01/03 04:00',
    endedAt: '2025/01/07 23:59',
    title: 'test6',
    contents: 'test6',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 7,
    startedAt: '2025/01/09 13:00',
    endedAt: '2025/01/09 14:00',
    title: 'test7',
    contents: 'test7',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 8,
    startedAt: '2025/01/09 11:00',
    endedAt: '2025/01/09 17:00',
    title: 'test8',
    contents: 'test8',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 9,
    startedAt: '2025/01/09 11:00',
    endedAt: '2025/01/11 17:00',
    title: 'test9',
    contents: 'test9',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 10,
    startedAt: '2025/02/09 11:00',
    endedAt: '2025/02/11 17:00',
    title: 'test9',
    contents: 'test9',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
]

const ScheduleHandlers = [
  http.get<never, null, null | ApiResponse<Schedule[]>>('/schedule', () => {
    return HttpResponse.json(new ApiResponse<Schedule[]>().build(apiCode.SUCCESS, schedules))
  }),

  http.post<never, Schedule, ApiResponse<number | null>>('/schedule', async ({ request }) => {
    const schedule: Schedule = await request.json()

    if (!schedule)
      return HttpResponse.json(new ApiResponse<null>().build(apiCode.INVALID_REQUEST_PARAM, null))

    const id = schedules.length + 1
    schedule.id = id
    schedules.push(schedule)

    return HttpResponse.json(new ApiResponse<number>().build(apiCode.SUCCESS, id))
  }),

  http.delete<{ id: string }, null, null>('/schedule/:id', ({ params }) => {
    const id = Number(params.id)
    if (!id)
      return HttpResponse.json(new ApiResponse<null>().build(apiCode.INVALID_REQUEST_PARAM, null))
    schedules = schedules.filter(schedule => schedule.id != id)
    return HttpResponse.json(new ApiResponse<number>().build(apiCode.SUCCESS, id))
  }),

  http.put<{ id: string }, Schedule, null>('/schedule/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const schedule = await request.json()
    if (!id || !schedule)
      return HttpResponse.json(new ApiResponse<null>().build(apiCode.INVALID_REQUEST_PARAM, null))

    schedules = schedules.map(stateSchedules =>
      stateSchedules.id == id ? schedule : stateSchedules,
    )
    return HttpResponse.json(new ApiResponse<null>().build(apiCode.SUCCESS, null))
  }),
]

export default ScheduleHandlers
