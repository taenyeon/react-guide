import { ScheduleType } from '@typings/constants/ScheduleType'

export class ScheduleOfDate {
  id: number
  type: ScheduleType
  year: number
  month: number
  day: number

  startHour: number
  startMinute: number

  endHour: number
  endMinute: number

  title: string
  contents: string

  order: number = 0
  isMultiple: boolean

  isStart: boolean = false
  isEnd: boolean = false

  startedAt: string
  endedAt: string

  createdAt: string
  updatedAt: string

  constructor(
    id: number,
    type: ScheduleType,
    year: number,
    month: number,
    day: number,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    title: string,
    contents: string,
    isMultiple: boolean,
    createdAt: string,
    updatedAt: string,
    startedAt: string,
    endedAt: string,
    order?: number,
    isStart?: boolean,
    isEnd?: boolean,
  ) {
    this.id = id
    this.type = type
    this.year = year
    this.month = month
    this.day = day
    this.startHour = startHour
    this.startMinute = startMinute
    this.endHour = endHour
    this.endMinute = endMinute
    this.title = title
    this.contents = contents
    this.isMultiple = isMultiple
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.startedAt = startedAt
    this.endedAt = endedAt
    if (order) this.order = order
    if (isStart) this.isStart = isStart
    if (isEnd) this.isEnd = isEnd
  }

  get startPercentage() {
    return ((this.startHour * 60 + this.startMinute) / 1440) * 100
  }

  get endPercentage() {
    return ((this.endHour * 60 + this.endMinute) / 1440) * 100
  }

  get isAllDay() {
    return (
      this.startHour == 0 && this.startMinute == 0 && this.endHour == 23 && this.endMinute == 59
    )
  }
}
