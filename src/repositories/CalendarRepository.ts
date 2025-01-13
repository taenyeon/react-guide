import dayjs from 'dayjs'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import { Calendar } from '@typings/Calendar'
import { getDate } from '@utils/date/dayJsFormat'
import scheduleRepository from '@repositories/ScheduleRepository'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'

const calendarRepository = {
  getMonthlyCalendar: async (date: { year?: number; month?: number } = {}) => {
    const { year, month } = date
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
    const schedules = await scheduleRepository.findAll()

    const scheduleOfDates: ScheduleOfDate[] = schedules
      .map(schedule => schedule.getScheduleOfDateList())
      .flatMap(schedules => schedules)
    console.log('scheduleOfDates : ', scheduleOfDates)
    startDate = startDate.subtract(startDate.day(), 'days')

    // 월 단위 최대 갯수 = 35
    while (dates.length != 35) {
      const dateOfCalendar = new DateOfCalendar({
        year: startDate.year(),
        month: startDate.month() + 1,
        day: startDate.date(),
        schedules: scheduleOfDates.filter(
          schedule =>
            schedule.year == startDate.year() &&
            schedule.month == startDate.month() + 1 &&
            schedule.date == startDate.date(),
        ),
      })
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
