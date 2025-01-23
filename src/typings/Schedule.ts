import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import dateFormatUtil from '@utils/date/dateFormatUtil'

// if date format DateFormat.ts -> use DateFormat
export class Schedule {
  id: number
  startedAt: string
  endedAt: string
  title: string
  contents: string

  createdAt: string
  updatedAt: string

  constructor(schedule: {
    id: number | null
    startedAt: string
    endedAt: string
    title: string
    contents: string
    createdAt: string
    updatedAt: string
  }) {
    this.id = schedule.id
    this.startedAt = schedule.startedAt
    this.endedAt = schedule.endedAt
    this.title = schedule.title
    this.contents = schedule.contents
    this.createdAt = schedule.createdAt
    this.updatedAt = schedule.updatedAt
  }

  getScheduleOfDateList(index: number) {
    if (this._isOneDaySchedule()) {
      const { stringToDate } = dateFormatUtil
      const startedAt = stringToDate(this.startedAt)
      const endedAt = stringToDate(this.endedAt)
      return [
        new ScheduleOfDate(
          this.id,
          startedAt.year(),
          startedAt.month() + 1,
          startedAt.date(),
          startedAt.hour(),
          startedAt.minute(),
          endedAt.hour(),
          endedAt.minute(),
          this.title,
          this.contents,
          false,
          this.createdAt,
          this.updatedAt,
          this.startedAt,
          this.endedAt,
        ),
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
        new ScheduleOfDate(
          this.id,
          start.year(),
          start.month() + 1,
          start.date(),
          startHour,
          startMinute,
          endHour,
          endMinute,
          this.title,
          this.contents,
          true,
          this.createdAt,
          this.updatedAt,
          this.startedAt,
          this.endedAt,
          index,
        ),
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
