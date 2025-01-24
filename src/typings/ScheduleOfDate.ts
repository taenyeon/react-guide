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

  isImportant: boolean = false

  startedAt: string
  endedAt: string

  createdAt: string
  updatedAt: string

  constructor(schedule: {
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
    isMultiple: boolean
    createdAt: string
    updatedAt: string
    startedAt: string
    endedAt: string
    order?: number
    isStart?: boolean
    isEnd?: boolean
    isImportant?: boolean
  }) {
    this.id = schedule.id
    this.type = schedule.type
    this.year = schedule.year
    this.month = schedule.month
    this.day = schedule.day
    this.startHour = schedule.startHour
    this.startMinute = schedule.startMinute
    this.endHour = schedule.endHour
    this.endMinute = schedule.endMinute
    this.title = schedule.title
    this.contents = schedule.contents
    this.isMultiple = schedule.isMultiple
    this.createdAt = schedule.createdAt
    this.updatedAt = schedule.updatedAt
    this.startedAt = schedule.startedAt
    this.endedAt = schedule.endedAt
    if (schedule.order) this.order = schedule.order
    if (schedule.isStart) this.isStart = schedule.isStart
    if (schedule.isEnd) this.isEnd = schedule.isEnd
    if (schedule.isImportant) this.isImportant = schedule.isImportant
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
