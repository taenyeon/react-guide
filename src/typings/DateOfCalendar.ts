import { getWeekdayByCode, weekday, Weekday } from '@typings/constants/Weekday'
import dayjs from 'dayjs'

export class DateOfCalendar {
  year: number
  month: number
  day: number
  weekday: Weekday = weekday.SUNDAY

  constructor(date: { year?: number; month?: number; day?: number } = {}) {
    const { year = 1, month = 1, day = 1 } = date

    const now = date ? dayjs(`${year}-${month}-${day}`) : dayjs()

    this.year = now.year()
    this.month = now.month() + 1
    this.day = now.date()
    this.weekday = getWeekdayByCode(now.day())
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
