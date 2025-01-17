import { ApiResponse } from '@utils/api/models/ApiResponse'
import { Schedule } from '@typings/Schedule'
import api from '@utils/api/api'
import ApiError from '@utils/error/ApiError'

type ScheduleRepository = {
  findAll: () => Promise<Schedule[]>
  add: (schedule: Schedule) => Promise<null | number>
  delete: (id: number) => Promise<void>
  modify: (id: number, schedule: Schedule) => Promise<void>
}

const scheduleRepository: ScheduleRepository = {
  findAll: async () => {
    const response = await api().get('schedule')

    const body = response.data.body.map(schedule => new Schedule(schedule))
    const apiResponse = new ApiResponse<Schedule[]>().parseClass(response, body)

    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

    return apiResponse.body
  },
  add: async (schedule: Schedule) => {
    const apiResponse: ApiResponse<number | null> = new ApiResponse<number | null>().parseData(
      await api().post('schedule', schedule),
    )
    if (apiResponse.isFailure) return null
    return apiResponse.body
  },
  delete: async id => {
    const apiResponse: ApiResponse<null> = new ApiResponse<null>().parseData(
      await api().delete(`schedule/${id}`),
    )
    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)
  },
  modify: async (id, schedule) => {
    const apiResponse: ApiResponse<null> = new ApiResponse<null>().parseData(
      await api().put(`schedule/${id}`, schedule),
    )
    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)
  },
}

export default scheduleRepository
