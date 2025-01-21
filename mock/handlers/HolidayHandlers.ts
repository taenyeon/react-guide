import { http, HttpResponse } from 'msw'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import { apiCode } from '@utils/error/constant/ApiCode'
import { Holiday } from '@typings/Holiday'

const holidays: Holiday[] = [
  { date: '2025/01/20', title: 'Test Holiday' },
  {
    date: '2025/01/21',
    title: 'Test Holiday2',
  },
  {
    date: '2025/01/01',
    title: 'New Year Day',
  },
  {
    date: '2025/01/02',
    title: 'Length Check Test Holiday',
  },
]

const HolidayHandlers = [
  http.get<never, null, ApiResponse<Holiday[]>>('/holiday', () => {
    return HttpResponse.json(new ApiResponse<Holiday[]>().build(apiCode.SUCCESS, holidays))
  }),
]

export default HolidayHandlers
