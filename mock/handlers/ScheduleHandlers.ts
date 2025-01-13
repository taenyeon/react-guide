import { http, HttpResponse } from 'msw'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import { Schedule } from '@typings/Schedule'
import { apiCode } from '@utils/error/constant/ApiCode'

const ScheduleHandlers = [
  http.get<never, null, null | ApiResponse<Schedule[]>>('/schedule', async () => {
    return HttpResponse.json(
      new ApiResponse<Schedule[]>().build(apiCode.SUCCESS, [
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
      ]),
    )
  }),
]

export default ScheduleHandlers
