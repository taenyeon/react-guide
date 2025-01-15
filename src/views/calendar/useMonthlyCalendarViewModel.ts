import calendarRepository from '@repositories/CalendarRepository'
import { useMemo, useState } from 'react'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import scheduleRepository from '@repositories/ScheduleRepository'

const useMonthlyCalendarViewModel = () => {
  const [calendar, setCalendar] = useState<Calendar | null>(null)

  const [schedules, setSchedules] = useState<ScheduleOfDate[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const calculatedMonthlyCalendar: Calendar | null = useMemo(() => {
    if (!calendar) return null
    const copy: Calendar = Object.assign(calendar)
    let prevSchedules: ScheduleOfDate[] = []
    copy.dates.forEach(date => {
      const resultSchedules = []
      const targetSchedules: ScheduleOfDate[] = schedules.filter(
        schedule =>
          schedule.year == date.year && schedule.month == date.month && schedule.day == date.day,
      )
      let prevIndex = 0
      targetSchedules.forEach(schedule => {
        const prevScheduleIndex = prevSchedules.findIndex(
          targetSchedule => targetSchedule != null && targetSchedule.id == schedule.id,
        )
        for (let i = prevIndex; i < prevScheduleIndex; i++) resultSchedules.push(null)

        resultSchedules.push(schedule)
        prevIndex = prevScheduleIndex + 1
      })
      prevSchedules = resultSchedules
      date.schedules = resultSchedules
    })
    return copy
  }, [calendar, schedules])
  const { getDate, getStringToDate } = dateFormatUtil

  const setMonthlyCalendar = async (year?: number, month?: number) => {
    const monthlyCalendar = await calendarRepository.getMonthlyCalendar({
      year: year,
      month: month,
    })

    const scheduleList = await scheduleRepository.findAll()

    const schedulesOfDate = scheduleList
      .sort((a, b) => (getStringToDate(a.startedAt).isAfter(getStringToDate(b.startedAt)) ? 1 : -1))
      .map((schedule, index) => schedule.getScheduleOfDateList(index + 1))
      .flatMap(schedules => schedules)

    setCalendar(() => monthlyCalendar)

    setSchedules(() => schedulesOfDate)
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

  const openPopup = () => setIsPopupOpen(() => true)
  const closePopup = () => setIsPopupOpen(() => false)

  return { calculatedMonthlyCalendar, init, next, prev, isPopupOpen, openPopup, closePopup }
}

export default useMonthlyCalendarViewModel
