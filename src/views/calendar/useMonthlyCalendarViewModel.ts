import calendarRepository from '@repositories/CalendarRepository'
import { useState } from 'react'
import { Calendar } from '@typings/Calendar'
import dayjs from 'dayjs'

const useMonthlyCalendarViewModel = () => {
  const [calendar, setCalendar] = useState<Calendar>(calendarRepository.getMonthlyCalendar())

  const setMonthlyCalendar = (year?: number, month?: number) =>
    setCalendar(() => calendarRepository.getMonthlyCalendar({ year: year, month: month }))

  const next = () => {
    const nextMonth = dayjs(`${calendar.year}-${calendar.month}`).add(1, 'month')
    setMonthlyCalendar(nextMonth.year(), nextMonth.month() + 1)
  }

  const prev = () => {
    const prevMonth = dayjs(`${calendar.year}-${calendar.month}`).subtract(1, 'month')
    setMonthlyCalendar(prevMonth.year(), prevMonth.month() + 1)
  }

  return { calendar, next, prev }
}

export default useMonthlyCalendarViewModel
