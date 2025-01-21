import { calendarDateType } from '@typings/constants/CalendarDateType'
import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'

const useCalendarPageViewModel = () => {
  const { selectedCalendarType, selectCalendarType } = useCalendarSelectStore(
    useShallow(state => ({
      selectedCalendarType: state.selectedCalendarType,
      selectCalendarType: state.selectCalendarType,
    })),
  )
  const calendarDateTypes = Object.values(calendarDateType)

  return { calendarDateTypes, selectCalendarType, selectedCalendarType }
}

export default useCalendarPageViewModel
