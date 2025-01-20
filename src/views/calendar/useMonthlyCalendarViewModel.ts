import calendarRepository from '@repositories/CalendarRepository'
import { useMemo } from 'react'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import scheduleRepository from '@repositories/ScheduleRepository'
import useCalendarStore from '@stores/useCalendarStore'
import useScheduleStore from '@stores/useScheduleStore'
import { useShallow } from 'zustand/react/shallow'
import useCalendarSelectStore from '@stores/useCalendarSelectStore'

const useMonthlyCalendarViewModel = () => {
  const { calendar, setCalendar } = useCalendarStore(
    useShallow(state => ({
      calendar: state.calendar,
      setCalendar: state.setCalendar,
    })),
  )

  const { schedules, setSchedules } = useScheduleStore(
    useShallow(state => ({
      schedules: state.schedules,
      setSchedules: state.setSchedules,
    })),
  )

  const openAddPopup = useCalendarSelectStore(state => state.openAddPopup)

  const { getDate, getStringToDate } = dateFormatUtil

  const calculatedMonthlyCalendar: Calendar | null = useMemo(() => {
    if (!calendar) return null

    const copy: Calendar = Object.assign(calendar)

    const schedulesOfDate = schedules
      .sort((a, b) => (getStringToDate(a.startedAt).isAfter(getStringToDate(b.startedAt)) ? 1 : -1))
      .map((schedule, index) => schedule.getScheduleOfDateList(index + 1))
      .flatMap(schedules => schedules)

    let prevSchedules: ScheduleOfDate[] = []

    copy.dates.forEach(date => {
      const resultSchedules: ScheduleOfDate[] = []
      const targetSchedules: ScheduleOfDate[] = schedulesOfDate.filter(
        schedule =>
          schedule.year == date.year && schedule.month == date.month && schedule.day == date.day,
      )

      let prevIndex = 0

      // 빈 요소 채우기 (null) => 화면에서 사용 할 경우, null 값에 대한 대응 필요.
      targetSchedules.forEach(schedule => {
        const prevScheduleIndex = prevSchedules.findIndex(
          targetSchedule => targetSchedule != null && targetSchedule.id == schedule.id,
        )
        for (let i = prevIndex; i < prevScheduleIndex; i++) resultSchedules.push(null)

        prevIndex = prevScheduleIndex + 1
      })

      // 일정 세팅
      targetSchedules.forEach(schedule => {
        const prevScheduleIndex = prevSchedules.findIndex(
          targetSchedule => targetSchedule != null && targetSchedule.id == schedule.id,
        )
        if (prevScheduleIndex != -1) {
          resultSchedules[prevScheduleIndex] = schedule
        } else {
          const nullIndex = resultSchedules.findIndex(targetSchedule => targetSchedule == null)
          if (nullIndex != -1) {
            resultSchedules[nullIndex] = schedule
          } else {
            resultSchedules.push(schedule)
          }
        }
      })

      prevSchedules = resultSchedules
      date.schedules = resultSchedules
    })

    return copy
  }, [calendar, schedules])

  const setMonthlyCalendar = async (year?: number, month?: number) => {
    const monthlyCalendar = await calendarRepository.getMonthlyCalendar({
      year: year,
      month: month,
    })

    const scheduleList = await scheduleRepository.findAll()

    setCalendar(monthlyCalendar)

    setSchedules(scheduleList)
  }

  const init = async () => {
    await setMonthlyCalendar()
  }

  const refresh = async () => {
    await setMonthlyCalendar(calendar.year, calendar.month)
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

  return {
    calculatedMonthlyCalendar,
    init,
    refresh,
    next,
    prev,
    openAddPopup,
  }
}

export default useMonthlyCalendarViewModel
