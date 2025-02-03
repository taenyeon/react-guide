import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'

const useDailyCalendarHeaderViewModel = () => {
  const { getDate } = dateFormatUtil

  const { currentDate, setCurrentDate } = useCalendarSelectStore(
    useShallow(state => ({
      currentDate: state.currentDate,
      setCurrentDate: state.setCurrentDate,
    })),
  )

  const next = async () => {
    const nextMonth = getDate({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    }).add(1, 'day')

    const targetDate = new DateOfCalendar({
      year: nextMonth.year(),
      month: nextMonth.month() + 1,
      day: nextMonth.date(),
    })
    setCurrentDate(targetDate)
  }

  const prev = async () => {
    const prevMonth = getDate({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    }).subtract(1, 'day')

    setCurrentDate(
      new DateOfCalendar({
        year: prevMonth.year(),
        month: prevMonth.month() + 1,
        day: prevMonth.date(),
      }),
    )
  }

  return { currentDate, next, prev }
}

export default useDailyCalendarHeaderViewModel
