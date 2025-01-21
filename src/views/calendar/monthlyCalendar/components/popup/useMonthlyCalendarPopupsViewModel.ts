import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'

const useMonthlyCalendarPopupsViewModel = () => {
  const { selectedDateIndex, selectedSchedule, isOpenAddPopup } = useCalendarSelectStore(
    useShallow(state => ({
      selectedDateIndex: state.selectedDateIndex,
      selectedSchedule: state.selectedSchedule,
      isOpenAddPopup: state.isOpenAddPopup,
    })),
  )

  return {
    selectedDateIndex,
    selectedSchedule,
    isOpenAddPopup,
  }
}

export default useMonthlyCalendarPopupsViewModel
