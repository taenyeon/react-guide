import { getWeekdayByCode, weekday, Weekday } from '@typings/constants/Weekday'
import dayjs from 'dayjs'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'

export class DateOfCalendar {
  year: number
  month: number
  day: number
  weekday: Weekday
  schedules: Array<ScheduleOfDate | null>

  constructor(
    date: {
      year?: number
      month?: number
      day?: number
      schedules?: Array<ScheduleOfDate | null>
    } = {},
  ) {
    const { year = 1, month = 1, day = 1, schedules = [] } = date

    const now = date ? dayjs(`${year}-${month}-${day}`) : dayjs()

    this.year = now.year()
    this.month = now.month() + 1
    this.day = now.date()
    this.weekday = getWeekdayByCode(now.day())
    this.schedules = schedules
  }

  get isSaturday() {
    return this.weekday.code == weekday.SATURDAY.code
  }

  get isHoliday() {
    return this.weekday.code == weekday.SUNDAY.code
  }

  isSameWeekday = (weekday: Weekday) => this.weekday.code == weekday.code
  isToday = (now: dayjs.Dayjs) =>
    now.year() == this.year && now.month() + 1 == this.month && now.date() == this.day
}
