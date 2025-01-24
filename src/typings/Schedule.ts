import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { scheduleType, ScheduleType } from '@typings/constants/ScheduleType'

// if date format DateFormat.ts -> use DateFormat
export class Schedule {
  id: number
  type: ScheduleType
  startedAt: string
  endedAt: string
  title: string
  contents: string

  isImportant: boolean

  createdAt: string
  updatedAt: string

  constructor(schedule: {
    id: number | null
    type?: ScheduleType
    startedAt: string
    endedAt: string
    title: string
    contents: string
    isImportant?: boolean
    createdAt: string
    updatedAt: string
  }) {
    const { dateToString, getDate } = dateFormatUtil

    const now = dateToString(getDate())

    const {
      id,
      type = scheduleType.TIME,
      startedAt,
      endedAt,
      title,
      contents,
      isImportant = false,
      createdAt = now,
      updatedAt = now,
    } = schedule

    this.id = id
    this.type = type
    this.startedAt = startedAt
    this.endedAt = endedAt
    this.title = title
    this.contents = contents
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.isImportant = isImportant
  }

  getScheduleOfDateList(index: number) {
    if (this._isOneDaySchedule()) {
      const { stringToDate } = dateFormatUtil
      const startedAt = stringToDate(this.startedAt)
      const endedAt = stringToDate(this.endedAt)
      return [
        new ScheduleOfDate({
          isMultiple: false,

          id: this.id,
          type: this.type,
          year: startedAt.year(),
          month: startedAt.month() + 1,
          day: startedAt.date(),
          startHour: startedAt.hour(),
          startMinute: startedAt.minute(),
          endHour: endedAt.hour(),
          endMinute: endedAt.minute(),
          title: this.title,
          contents: this.contents,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          startedAt: this.startedAt,
          endedAt: this.endedAt,
          isImportant: this.isImportant,
        }),
      ] as ScheduleOfDate[]
    }
    return this._calculateSchedule(index)
  }

  private _isOneDaySchedule: () => boolean = () => {
    const { stringToDate } = dateFormatUtil
    return stringToDate(this.startedAt).isSame(stringToDate(this.endedAt), 'date')
  }

  private _calculateSchedule: (index: number) => ScheduleOfDate[] = index => {
    const scheduleOfDateList: ScheduleOfDate[] = []
    const { stringToDate } = dateFormatUtil
    const startedAt = stringToDate(this.startedAt)
    const endedAt = stringToDate(this.endedAt)

    let start = startedAt.clone()
    const end = endedAt.clone().add(1, 'day')

    while (!start.isSame(end, 'date')) {
      let startHour: number
      let startMinute: number
      let endHour: number
      let endMinute: number
      if (start.isSame(endedAt, 'date')) {
        startHour = 0
        startMinute = 0
        endHour = endedAt.hour()
        endMinute = endedAt.minute()
      } else if (start.isSame(startedAt, 'date')) {
        startHour = startedAt.hour()
        startMinute = startedAt.minute()
        endHour = 23
        endMinute = 59
      } else {
        startHour = 0
        startMinute = 0
        endHour = 23
        endMinute = 59
      }

      scheduleOfDateList.push(
        new ScheduleOfDate({
          isMultiple: true,

          id: this.id,
          type: this.type,
          year: start.year(),
          month: start.month() + 1,
          day: start.date(),
          startHour: startHour,
          startMinute: startMinute,
          endHour: endHour,
          endMinute: endMinute,
          title: this.title,
          contents: this.contents,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          startedAt: this.startedAt,
          endedAt: this.endedAt,
          isImportant: this.isImportant,
          order: index,
        }),
      )

      start = start.add(1, 'day')
    }

    if (scheduleOfDateList.length) {
      scheduleOfDateList[0].isStart = true
      scheduleOfDateList[scheduleOfDateList.length - 1].isEnd = true
    }
    return scheduleOfDateList
  }
}
