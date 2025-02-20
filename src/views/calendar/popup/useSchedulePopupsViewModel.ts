import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'

const useSchedulePopupsViewModel = () => {
  const { selectedDate, selectedSchedule, isOpenAddPopup } = useCalendarSelectStore(
    useShallow(state => ({
      selectedDate: state.selectedDate,
      selectedSchedule: state.selectedScheduleId,
      isOpenAddPopup: state.isOpenAddPopup,
    })),
  )

  return {
    selectedDate,
    selectedSchedule,
    isOpenAddPopup,
  }
}

export default useSchedulePopupsViewModel
