import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'
import useCalendarStore from '@stores/useCalendarStore'
import useScheduleStore from '@stores/useScheduleStore'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import calendarRepository from '@repositories/CalendarRepository'
import scheduleRepository from '@repositories/ScheduleRepository'
import { Calendar } from '@typings/Calendar'
import { useMemo } from 'react'
import { scheduleType } from '@typings/constants/ScheduleType'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'

const useDailyCalendarViewModel = () => {
  const currentDate = useCalendarSelectStore(useShallow(state => state.currentDate))

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

  const { stringToDate } = dateFormatUtil

  const calculatedDailyCalendar: null | Calendar = useMemo(() => {
    if (!calendar) return null

    const copyCalendar: Calendar = Object.assign(calendar)

    const schedulesOfDate = schedules
      .sort(a => (a.type == scheduleType.TASK ? 1 : -1))
      .sort((a, b) => (stringToDate(a.startedAt).isAfter(stringToDate(b.startedAt)) ? 1 : -1))
      .map((schedule, index) => schedule.getScheduleOfDateList(index + 1))
      .flatMap(schedules => schedules)

    let prevSchedules: ScheduleOfDate[] = []

    copyCalendar.dates.forEach(date => {
      const resultSchedules: ScheduleOfDate[] = []
      const targetSchedules: ScheduleOfDate[] = schedulesOfDate.filter(
        schedule =>
          schedule.year == date.year && schedule.month == date.month && schedule.day == date.day,
      )

      let prevIndex = 0
      // 빈 요소 null 세팅 => 화면에서 사용 할 경우, null 값에 대한 대응 필요.
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

    return copyCalendar
  }, [calendar, schedules])

  const setDailyCalendar = async () => {
    const dailyCalendar = await calendarRepository.getDailyCalendar({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    })

    const scheduleList = await scheduleRepository.findByDate({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    })

    setCalendar(dailyCalendar)

    setSchedules(scheduleList)
  }

  const init = async () => {
    await setDailyCalendar()
  }

  return {
    currentDate,
    calculatedDailyCalendar,
    init,
  }
}

export default useDailyCalendarViewModel
