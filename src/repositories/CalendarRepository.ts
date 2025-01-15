import dayjs from 'dayjs'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'

const calendarRepository = {
  getMonthlyCalendar: async (date: { year?: number; month?: number } = {}) => {
    const { year, month } = date
    const { getDate } = dateFormatUtil
    const now = getDate()

    const calendar = new Calendar({
      year: year ? year : now.year(),
      month: month ? month : now.month() + 1,
    })

    const dates: DateOfCalendar[] = []
    // 1일부터 세팅
    // 특정 month가 있을 경우, 해당 month로 변경 -> dayjs month는 0이 1월
    let startDate = getDate({ year: calendar.year, month: calendar.month, day: 1 })

    startDate = startDate.subtract(startDate.day(), 'days')

    // 월 단위 최대 갯수 = 35
    while (dates.length != 35) {
      const dateOfCalendar = new DateOfCalendar({
        year: startDate.year(),
        month: startDate.month() + 1,
        day: startDate.date(),
        schedules: [],
      })
      dates.push(dateOfCalendar)
      startDate = startDate.add(1, 'day')
    }
    calendar.dates = dates
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
