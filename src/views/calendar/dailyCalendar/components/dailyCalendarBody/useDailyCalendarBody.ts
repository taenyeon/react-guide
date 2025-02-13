import useCalendarSelectStore from '@stores/useCalendarSelectStore'

const useDailyCalendarBodyViewModel = () => {
  const selectSchedule = useCalendarSelectStore(state => state.selectSchedule)

  return {
    selectSchedule,
  }
}

export default useDailyCalendarBodyViewModel
