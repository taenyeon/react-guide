import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'

const useMonthlyCalendarPopupsViewModel = () => {
  const { selectedDate, selectedSchedule, isOpenAddPopup } = useCalendarSelectStore(
    useShallow(state => ({
      selectedDate: state.selectedDate,
      selectedSchedule: state.selectedSchedule,
      isOpenAddPopup: state.isOpenAddPopup,
    })),
  )

  return {
    selectedDate,
    selectedSchedule,
    isOpenAddPopup,
  }
}

export default useMonthlyCalendarPopupsViewModel
