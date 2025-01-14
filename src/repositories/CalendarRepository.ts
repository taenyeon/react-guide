import dayjs from 'dayjs'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import { Calendar } from '@typings/Calendar'
import scheduleRepository from '@repositories/ScheduleRepository'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { Schedule } from '@typings/Schedule'

const calendarRepository = {
  getMonthlyCalendar: async (date: { year?: number; month?: number } = {}) => {
    const { year, month } = date
    const { getDate, getStringToDate } = dateFormatUtil
    const now = getDate()

    const calendar = new Calendar({
      year: year ? year : now.year(),
      month: month ? month : now.month() + 1,
    })

    const dates: DateOfCalendar[] = []
    // 1일부터 세팅
    // 특정 month가 있을 경우, 해당 month로 변경 -> dayjs month는 0이 1월
    let startDate = getDate({ year: calendar.year, month: calendar.month, day: 1 })

    // 일요일부터 시작
    console.log(startDate.day())
    const schedules: Schedule[] = await scheduleRepository.findAll()

    const scheduleOfDates: ScheduleOfDate[] = schedules
      .sort((a, b) => (getStringToDate(a.startedAt).isAfter(getStringToDate(b.startedAt)) ? 1 : -1))
      .map((schedule, index) => schedule.getScheduleOfDateList(index + 1))
      .flatMap(schedules => schedules)

    console.log('scheduleOfDates : ', scheduleOfDates)
    startDate = startDate.subtract(startDate.day(), 'days')

    let prevSchedules: ScheduleOfDate[] = []

    // 월 단위 최대 갯수 = 35
    while (dates.length != 35) {
      const schedules = []
      const targetSchedules: ScheduleOfDate[] = scheduleOfDates.filter(
        schedule =>
          schedule.year == startDate.year() &&
          schedule.month == startDate.month() + 1 &&
          schedule.date == startDate.date(),
      )
      let prevIndex = 0
      targetSchedules.forEach(schedule => {
        const prevScheduleIndex = prevSchedules.findIndex(
          targetSchedule => targetSchedule != null && targetSchedule.id == schedule.id,
        )
        for (let i = prevIndex; i < prevScheduleIndex; i++) {
          schedules.push(null)
        }
        schedules.push(schedule)
        prevIndex = prevScheduleIndex + 1
      })
      console.log(schedules)

      const dateOfCalendar = new DateOfCalendar({
        year: startDate.year(),
        month: startDate.month() + 1,
        day: startDate.date(),
        schedules: schedules,
      })
      prevSchedules = schedules
      dates.push(dateOfCalendar)
      startDate = startDate.add(1, 'day')
    }
    calendar.dates = dates
    console.log('calendar', calendar)
    return calendar
  },

  getYearlyCalendar: (year?: number) => {
    const baseDate = dayjs()
    const calendar = new Calendar({ year: year ? baseDate.year() : year })
    // todo 작성중
    return calendar
  },
}

export default calendarRepository
