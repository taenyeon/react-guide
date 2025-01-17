import { KeyboardEvent, useState } from 'react'
import useSelectedDateStore from '@stores/useSelectedDateStore'
import useScheduleStore from '@stores/useScheduleStore'
import scheduleRepository from '@repositories/ScheduleRepository'

const useMonthlyCalendarDatePopupViewModel = () => {
  const { selectedDate, unselectDate } = useSelectedDateStore()
  const { deleteSchedules } = useScheduleStore()
  const [swipedSchedule, setSwipedSchedule] = useState<number | null>(null)
  const [startX, setStartX] = useState(0)
  const [endX, setEndX] = useState(0)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Escape') unselectDate()
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

  const setEvent = () => window.addEventListener('keydown', handleKeyDown)

  const removeEvent = () => window.removeEventListener('keydown', handleKeyDown)

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

  return {
    selectedDate,
    swipedSchedule,
    setEvent,
    removeEvent,
    onClose,
    handleStart,
    handleMove,
    handleEnd,
    deleteSchedule,
  }
}

export default useMonthlyCalendarDatePopupViewModel
