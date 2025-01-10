import { calendarDateType, CalendarDateType } from '@typings/constants/CalendarDateType'
import { DateOfCalendar } from '@typings/DateOfCalendar'

export class Calendar {
  year: number
  month: number | null
  day: number | null
  type: CalendarDateType = calendarDateType.YEARLY
  dates: DateOfCalendar[]

  constructor(date: { year: number; month?: number; day?: number }) {
    const { year, month = null, day = null } = date

    const type: CalendarDateType = this.parseType(month, day)

    this.year = year
    this.month = month
    this.day = day
    this.type = type
  }

  private parseType(month: number, day: number) {
    if (month) return calendarDateType.MONTHLY
    if (day) return calendarDateType.DAILY
  }
}
