import { getWeekdayByCode, weekday, Weekday } from '@typings/constants/Weekday'
import dayjs from 'dayjs'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import dateFormatUtil from '@utils/date/dateFormatUtil'

export class DateOfCalendar {
  year: number
  month: number
  day: number
  weekday: Weekday
  schedules: Array<ScheduleOfDate | null>
  holiday: null | string = null

  constructor(
    date: {
      year?: number
      month?: number
      day?: number
      schedules?: Array<ScheduleOfDate | null>
      holiday?: null | string
    } = {},
  ) {
    const now = dateFormatUtil.getDate()

    const {
      year = now.year(),
      month = now.month() + 1,
      day = now.date(),
      schedules = [],
      holiday = null,
    } = date

    const targetDate = date ? dayjs(`${year}-${month}-${day}`) : now

    this.year = targetDate.year()
    this.month = targetDate.month() + 1
    this.day = targetDate.date()
    this.weekday = getWeekdayByCode(targetDate.day())
    this.schedules = schedules
    this.holiday = holiday
  }

  get isSaturday() {
    return this.weekday.code == weekday.SATURDAY.code
  }

  get isSunday() {
    return this.weekday.code == weekday.SUNDAY.code || this.holiday
  }

  isSameWeekday = (weekday: Weekday) => this.weekday.code == weekday.code
  isToday = (now: dayjs.Dayjs) =>
    now.year() == this.year && now.month() + 1 == this.month && now.date() == this.day
}
