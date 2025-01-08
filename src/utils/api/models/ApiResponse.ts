import { ApiCode, apiCode } from '@utils/error/constant/ApiCode'
import { AxiosResponse } from 'axios'

export class ApiResponse<T> {
  code: ApiCode = apiCode.SUCCESS
  message: string = apiCode.SUCCESS
  body: T | null = null

  constructor() {}

  parseData = (response: AxiosResponse) => {
    this.code = response.data['code']
    this.message = response.data['message']
    this.body = response.data['body']
    return this
  }

  build = (apiCode: ApiCode, data: T | null) => {
    this.code = apiCode
    this.message = apiCode
    this.body = data
    return this
  }

  get isFailure(): boolean {
    return this.code != apiCode.SUCCESS
  }
}
