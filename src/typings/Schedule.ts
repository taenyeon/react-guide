import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import { getStringToDate } from '@utils/date/dayJsFormat'

// if date format dayJsFormat.ts -> use DayJsFormat
export class Schedule {
  id: number
  startedAt: string
  endedAt: string
  title: string
  contents: string

  createdAt: string
  updatedAt: string

  constructor(schedule: {
    id: number
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

  getScheduleOfDateList() {
    if (this._isOneDaySchedule()) {
      const startedAt = getStringToDate(this.startedAt)
      const endedAt = getStringToDate(this.endedAt)
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
          this.createdAt,
          this.updatedAt,
        ),
      ] as ScheduleOfDate[]
    }
    return this._calculateSchedule()
  }

  private _isOneDaySchedule: () => boolean = () =>
    getStringToDate(this.startedAt).isSame(getStringToDate(this.endedAt), 'date')

  private _calculateSchedule: () => ScheduleOfDate[] = () => {
    const scheduleOfDateList: ScheduleOfDate[] = []

    const startedAt = getStringToDate(this.startedAt)
    const endedAt = getStringToDate(this.endedAt)

    let datetime = startedAt.clone()

    while (!datetime.isSame(endedAt, 'date')) {
      let startHour: number
      let startMinute: number
      let endHour: number
      let endMinute: number
      if (startedAt.isSame(startedAt, 'date')) {
        startHour = 0
        startMinute = 0
        endHour = endedAt.hour()
        endMinute = endedAt.minute()
      } else if (datetime.isSame(endedAt, 'date')) {
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
          datetime.year(),
          datetime.month() + 1,
          datetime.date(),
          startHour,
          startMinute,
          endHour,
          endMinute,
          this.title,
          this.contents,
          this.createdAt,
          this.updatedAt,
        ),
      )
      datetime = datetime.add(1, 'day')
    }

    return scheduleOfDateList
  }
}
