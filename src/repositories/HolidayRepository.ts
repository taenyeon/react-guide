import api from '@utils/api/api'
import { ApiResponse } from '@utils/api/models/ApiResponse'
import ApiError from '@utils/error/ApiError'
import { Holiday } from '@typings/Holiday'

const HolidayRepository = {
  findAll: async () => {
    const apiResponse = new ApiResponse<Holiday[]>().parseData(await api().get('holiday'))

    if (apiResponse.isFailure) throw new ApiError(apiResponse.code)

    return apiResponse.body
  },
}

export default HolidayRepository
