import calendarRepository from '@repositories/CalendarRepository'
import { useState } from 'react'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'

const useMonthlyCalendarViewModel = () => {
  const [calendar, setCalendar] = useState<Calendar | null>(null)
  const { getDate } = dateFormatUtil

  const setMonthlyCalendar = async (year?: number, month?: number) => {
    const monthlyCalendar = await calendarRepository.getMonthlyCalendar({
      year: year,
      month: month,
    })
    setCalendar(() => monthlyCalendar)
  }

  const init = async () => {
    await setMonthlyCalendar()
  }

  const next = async () => {
    const nextMonth = getDate({
      year: calendar.year,
      month: calendar.month,
      day: 1,
    }).add(1, 'month')
    await setMonthlyCalendar(nextMonth.year(), nextMonth.month() + 1)
  }

  const prev = async () => {
    const prevMonth = getDate({
      year: calendar.year,
      month: calendar.month,
      day: 1,
    }).subtract(1, 'month')
    await setMonthlyCalendar(prevMonth.year(), prevMonth.month() + 1)
  }

  return { calendar, init, next, prev }
}

export default useMonthlyCalendarViewModel
