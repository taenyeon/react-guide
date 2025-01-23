import { KeyboardEvent, useState } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { Schedule } from '@typings/Schedule'
import scheduleRepository from '@repositories/ScheduleRepository'
import useScheduleStore from '@stores/useScheduleStore'
import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'

interface AddScheduleTitle {
  value: string
  error: string
}

interface AddScheduleContent {
  value: string
  error: string
}

interface AddScheduleStartedAt {
  value: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
  }
  error: string
}

interface AddScheduleEndedAt {
  value: {
    year: number
    month: number
    day: number
    hour: number
    minute: number
  }
  error: string
}

const useMonthlyCalendarAddPopupViewModel = () => {
  const { getDate, dateToString } = dateFormatUtil

  const { isOpenAddPopup, currentDate, closeAddPopup } = useCalendarSelectStore(
    useShallow(state => ({
      isOpenAddPopup: state.isOpenAddPopup,
      currentDate: state.currentDate,
      closeAddPopup: state.closeAddPopup,
    })),
  )

  const addSchedules = useScheduleStore(state => state.addSchedules)

  const [title, setTitle] = useState<AddScheduleTitle>({ value: '', error: '' })

  const [contents, setContents] = useState<AddScheduleContent>({ value: '', error: '' })

  const [startedAt, setStartedAt] = useState<AddScheduleStartedAt>(() => {
    const now = getDate()
    return {
      value: {
        year: now.year(),
        month: now.month() + 1,
        day: now.date(),
        hour: now.hour(),
        minute: 0,
      },
      error: '',
    }
  })

  const [endedAt, setEndedAt] = useState<AddScheduleEndedAt>(() => {
    const now = getDate().add(1, 'hour')
    return {
      value: {
        year: now.year(),
        month: now.month() + 1,
        day: now.date(),
        hour: now.hour(),
        minute: 0,
      },
      error: '',
    }
  })

  const init = () => {
    const start = getDate({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
    })
    const end = start.add(1, 'hour')
    setTitle({ value: '', error: '' })
    setContents({ value: '', error: '' })
    setStartedAt({
      value: {
        year: start.year(),
        month: start.month() + 1,
        day: start.date(),
        hour: start.hour(),
        minute: 0,
      },
      error: '',
    })
    setEndedAt({
      value: {
        year: end.year(),
        month: end.month() + 1,
        day: end.date(),
        hour: end.hour(),
        minute: 0,
      },
      error: '',
    })
  }

  const inputTitle = (state: string) =>
    setTitle(prevState => {
      return { ...prevState, value: state }
    })

  const inputContents = (state: string) =>
    setContents(prevState => {
      return { ...prevState, value: state }
    })

  const inputStartedAt = (date?: {
    type: 'year' | 'month' | 'day' | 'hour' | 'minute'
    value: string
  }) => {
    if (!/^\d*$/.test(date.value)) return
    if (!checkLange(date)) return
    const replaceValue = Number(date.value)

    setStartedAt(prevState => {
      return {
        ...prevState,
        value: {
          year: date.type == 'year' ? replaceValue : prevState.value.year,
          month: date.type == 'month' ? replaceValue : prevState.value.month,
          day: date.type == 'day' ? replaceValue : prevState.value.day,
          hour: date.type == 'hour' ? replaceValue : prevState.value.hour,
          minute: date.type == 'minute' ? replaceValue : prevState.value.minute,
        },
      }
    })
  }

  const inputEndedAt = (date?: {
    type: 'year' | 'month' | 'day' | 'hour' | 'minute'
    value: string
  }) => {
    if (!/^\d*$/.test(date.value)) return
    if (!checkLange(date)) return
    const replaceValue = Number(date.value)

    setEndedAt(prevState => {
      return {
        ...prevState,
        value: {
          year: date.type == 'year' ? replaceValue : prevState.value.year,
          month: date.type == 'month' ? replaceValue : prevState.value.month,
          day: date.type == 'day' ? replaceValue : prevState.value.day,
          hour: date.type == 'hour' ? replaceValue : prevState.value.hour,
          minute: date.type == 'minute' ? replaceValue : prevState.value.minute,
        },
      }
    })
  }

  const checkLange = (date?: {
    type: 'year' | 'month' | 'day' | 'hour' | 'minute'
    value: string
  }) => {
    const replaceValue = Number(date.value)
    switch (date.type) {
      case 'year':
        return date.value.length < 5
      case 'month':
        return replaceValue <= 12
      case 'day':
        return replaceValue <= 31
      case 'hour':
        return replaceValue <= 23
      case 'minute':
        return replaceValue <= 59
    }
  }

  const addSchedule = async () => {
    const now = getDate()
    const scheduleStartedAt = getDate(startedAt.value)
    const scheduleEndedAt = getDate(endedAt.value)

    if (scheduleStartedAt.isAfter(scheduleEndedAt)) {
      setStartedAt(prevState => {
        return { ...prevState, error: 'started is after then endedAt' }
      })
      console.log('started is after then endedAt')
      return
    }

    const schedule = new Schedule({
      id: null,
      title: title.value,
      contents: contents.value,
      startedAt: dateToString(scheduleStartedAt),
      endedAt: dateToString(scheduleEndedAt),
      createdAt: dateToString(now),
      updatedAt: dateToString(now),
    })
    // add request
    const id = await scheduleRepository.add(schedule)
    //
    if (!id) return false
    schedule.id = id
    addSchedules(schedule)
    init()

    return true
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Escape') closeAddPopup()
  }

  const setEvent = () =>
    window.addEventListener('keydown', handleKeyDown as unknown as EventListener)

  const removeEvent = () =>
    window.removeEventListener('keydown', handleKeyDown as unknown as EventListener)

  return {
    isOpenAddPopup,
    title,
    contents,
    startedAt,
    endedAt,
    closeAddPopup,
    currentDate,
    init,
    inputTitle,
    inputContents,
    inputStartedAt,
    inputEndedAt,
    addSchedule,
    setEvent,
    removeEvent,
  }
}

export default useMonthlyCalendarAddPopupViewModel
