import { ApiResponse } from '@utils/api/models/ApiResponse'
import { Schedule } from '@typings/Schedule'
import api from '@utils/api/api'
import ApiError from '@utils/error/ApiError'

type ScheduleRepository = {
  findAll: () => Promise<Schedule[]>
}

const scheduleRepository: ScheduleRepository = {
  findAll: async () => {
    const response = await api().get('schedule')

    const body = response.data.body.map(schedule => new Schedule(schedule))
    const apiResponse = new ApiResponse<Schedule[]>().parseClass(response, body)

    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

    return apiResponse.body
  },
}

export default scheduleRepository
