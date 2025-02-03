import { calendarDateType, CalendarDateType } from '@typings/constants/CalendarDateType'
import { DateOfCalendar } from '@typings/DateOfCalendar'

export class Calendar {
  year: number
  month: number | null
  day: number | null
  type: CalendarDateType = calendarDateType.MONTHLY
  dates: DateOfCalendar[]

  constructor(date: { year: number; month?: number; day?: number; type?: CalendarDateType }) {
    const { year, month = null, day = null, type } = date

    this.year = year
    this.month = month
    this.day = day
    this.type = type ? type : this.parseType(month, day)
  }

  private parseType(month: number, day: number) {
    if (day) return calendarDateType.DAILY
    if (month) return calendarDateType.MONTHLY
  }
}
