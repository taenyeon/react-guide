import dayjs from 'dayjs'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import { Calendar } from '@typings/Calendar'

const calendarRepository = {
  getMonthlyCalendar: (date: { year?: number; month?: number } = {}) => {
    const { year, month } = date
    const baseDate = dayjs()

    const calendar = new Calendar({
      year: year ? year : baseDate.year(),
      month: month ? month : baseDate.month() + 1,
    })

    const dates: DateOfCalendar[] = []
    // 1일부터 세팅
    let startDate = baseDate.date(1)
    // 특정 month가 있을 경우, 해당 month로 변경 -> dayjs month는 0이 1월
    if (month) startDate = startDate.month(month - 1)
    // 일요일부터 시작
    startDate = startDate.subtract(startDate.day(), 'days')
    console.log('startDate', startDate)
    // 월 단위 최대 갯수 = 35
    while (dates.length != 35) {
      const dateOfCalendar = new DateOfCalendar({
        year: startDate.year(),
        month: startDate.month() + 1,
        day: startDate.date(),
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
