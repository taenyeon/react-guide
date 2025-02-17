import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'
import { DateOfCalendar } from '@typings/DateOfCalendar'

const useMonthlyCalendarDateViewModel = () => {
  const { selectDate, setCurrentDate } = useCalendarSelectStore(
    useShallow(state => ({
      selectDate: state.selectDate,
      setCurrentDate: state.setCurrentDate,
    })),
  )

  const selectDay = (date: DateOfCalendar) => {
    selectDate(date)
    setCurrentDate(date)
  }

  return {
    selectDay,
  }
}

export default useMonthlyCalendarDateViewModel
