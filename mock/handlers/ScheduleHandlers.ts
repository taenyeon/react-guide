import { http, HttpResponse } from 'msw'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import { Schedule } from '@typings/Schedule'
import { apiCode } from '@utils/error/constant/ApiCode'
import { scheduleType } from '@typings/constants/ScheduleType'

let schedules = [
  new Schedule({
    id: 1,
    type: scheduleType.TIME,
    startedAt: '2025/01/06 00:00',
    endedAt: '2025/01/10 23:59',
    title: 'schedule1',
    contents: 'schedule1',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 2,
    type: scheduleType.TIME,
    startedAt: '2025/01/07 07:00',
    endedAt: '2025/01/07 12:30',
    title: 'schedule2',
    contents: 'schedule2',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 3,
    type: scheduleType.TIME,
    startedAt: '2025/01/07 08:00',
    endedAt: '2025/01/07 08:30',
    title: 'schedule3',
    contents: 'schedule3',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 4,
    type: scheduleType.TIME,
    startedAt: '2025/01/05 04:00',
    endedAt: '2025/01/05 23:00',
    title: 'schedule4',
    contents: 'schedule4',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 5,
    type: scheduleType.TIME,
    startedAt: '2025/01/07 04:00',
    endedAt: '2025/01/09 23:59',
    title: 'schedule5',
    contents: 'schedule5',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 6,
    type: scheduleType.TIME,
    isImportant: true,
    startedAt: '2025/01/03 04:00',
    endedAt: '2025/01/07 23:59',
    title: 'schedule6',
    contents: 'schedule6',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 7,
    type: scheduleType.TIME,
    startedAt: '2025/01/09 13:00',
    endedAt: '2025/01/09 14:00',
    title: 'schedule7',
    contents: 'schedule7',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 8,
    type: scheduleType.TIME,
    startedAt: '2025/01/09 11:00',
    endedAt: '2025/01/09 17:00',
    title: 'schedule8',
    contents: 'schedule8',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 9,
    type: scheduleType.TIME,
    startedAt: '2025/01/09 11:00',
    endedAt: '2025/01/11 17:00',
    title: 'schedule9',
    contents: 'schedule9',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 10,
    type: scheduleType.TIME,
    startedAt: '2025/02/09 11:00',
    endedAt: '2025/02/11 17:00',
    title: 'schedule9',
    contents: 'schedule9',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 11,
    type: scheduleType.TASK,
    startedAt: '2025/02/09 00:00',
    endedAt: '2025/02/11 23:59',
    title: 'task1',
    contents: 'task1',
    createdAt: '2025/01/06 15:00:00',
    updatedAt: '2025/01/06 15:00:00',
  }),
  new Schedule({
    id: 12,
    type: scheduleType.TASK,
    isImportant: true,
    startedAt: '2025/01/01 00:00',
    endedAt: '2025/01/02 23:59',
    title: 'task2',
    contents: 'task2',
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
