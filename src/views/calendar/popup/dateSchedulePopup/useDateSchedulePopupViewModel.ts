import { KeyboardEvent, useState } from 'react'
import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import useScheduleStore from '@stores/useScheduleStore'
import scheduleRepository from '@repositories/ScheduleRepository'
import { useShallow } from 'zustand/react/shallow'
import useCalendarStore from '@stores/useCalendarStore'

const useDateSchedulePopupViewModel = () => {
  const { selectedDate, unselectDate, selectSchedule, openAddPopup } = useCalendarSelectStore(
    useShallow(state => ({
      selectedDate: state.selectedDate,
      unselectDate: state.unselectDate,
      selectSchedule: state.selectSchedule,
      openAddPopup: state.openAddPopup,
    })),
  )

  const deleteSchedules = useScheduleStore(state => state.deleteSchedules)

  const targetDate = useCalendarStore(
    useShallow(state =>
      state.calendar.dates.find(
        date =>
          date.year == selectedDate.year &&
          date.month == selectedDate.month &&
          date.day == selectedDate.day,
      ),
    ),
  )

  const [swipedSchedule, setSwipedSchedule] = useState<number | null>(null)

  const [startX, setStartX] = useState(0)

  const [endX, setEndX] = useState(0)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Escape') onClose()
  }

  const handleStart = (clientX: number) => {
    setStartX(clientX)
    setSwipedSchedule(null) // 초기화
  }

  const handleMove = (clientX: number) => {
    setEndX(clientX)
  }

  const handleEnd = (scheduleId: number) => {
    if (startX - endX > 50) {
      // 왼쪽으로 드래그/스와이프
      setSwipedSchedule(scheduleId)
    } else {
      // 드래그/스와이프 취소
      setSwipedSchedule(null)
    }
  }

  const setEvent = () =>
    window.addEventListener('keydown', handleKeyDown as unknown as EventListener)

  const removeEvent = () =>
    window.removeEventListener('keydown', handleKeyDown as unknown as EventListener)

  const onClose = () => {
    unselectDate()
    setSwipedSchedule(() => null)
    setStartX(() => 0)
    setEndX(() => 0)
  }

  const deleteSchedule = async (id: number) => {
    await scheduleRepository.delete(id)
    deleteSchedules(id)
  }

  const openScheduleModifyPopup = (id: number) => selectSchedule(id)

  const openScheduleAddPopup = () => openAddPopup()

  return {
    targetDate,
    swipedSchedule,
    setEvent,
    removeEvent,
    onClose,
    handleStart,
    handleMove,
    handleEnd,
    deleteSchedule,
    openScheduleModifyPopup,
    openScheduleAddPopup,
  }
}

export default useDateSchedulePopupViewModel
