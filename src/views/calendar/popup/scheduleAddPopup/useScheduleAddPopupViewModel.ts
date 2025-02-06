import { KeyboardEvent, useState } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { Schedule } from '@typings/Schedule'
import scheduleRepository from '@repositories/ScheduleRepository'
import useScheduleStore from '@stores/useScheduleStore'
import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import { useShallow } from 'zustand/react/shallow'
import { ScheduleType, scheduleType } from '@typings/constants/ScheduleType'

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
  disabled: boolean
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
  disabled: boolean
  error: string
}

const useScheduleAddPopupViewModel = () => {
  const { getDate, dateToString } = dateFormatUtil

  const { isOpenAddPopup, currentDate, closeAddPopup } = useCalendarSelectStore(
    useShallow(state => ({
      isOpenAddPopup: state.isOpenAddPopup,
      currentDate: state.currentDate,
      closeAddPopup: state.closeAddPopup,
    })),
  )

  const addSchedules = useScheduleStore(state => state.addSchedules)

  const [type, setType] = useState<ScheduleType>(scheduleType.TIME)

  const [title, setTitle] = useState<AddScheduleTitle>({ value: '', error: '' })

  const [contents, setContents] = useState<AddScheduleContent>({ value: '', error: '' })

  const [isAllDay, setIsAllDay] = useState<boolean>(false)

  const [isImportant, setIsImportant] = useState<boolean>(false)

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
      disabled: false,
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
      disabled: false,
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
      disabled: false,
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
      disabled: false,
      error: '',
    })
  }

  const toggleType = (state: ScheduleType) => {
    setType(state)
    init()
  }

  const inputTitle = (state: string) => setTitle(prevState => ({ ...prevState, value: state }))

  const inputContents = (state: string) =>
    setContents(prevState => ({ ...prevState, value: state }))

  const toggleImportant = () => setIsImportant(prevState => !prevState)

  const toggleAllDay = () => {
    if (isAllDay) {
      setIsAllDay(false)
      setStartedAt(prevState => ({ ...prevState, disabled: false }))
      setEndedAt(prevState => ({ ...prevState, disabled: false }))
      return
    }

    setIsAllDay(true)
    setStartedAt(prevState => ({
      ...prevState,
      value: {
        year: currentDate.year,
        month: currentDate.month,
        day: currentDate.day,
        hour: 0,
        minute: 0,
      },
      disabled: true,
    }))
    setEndedAt(prevState => ({
      ...prevState,
      value: {
        year: currentDate.year,
        month: currentDate.month,
        day: currentDate.day,
        hour: 23,
        minute: 59,
      },
      disabled: true,
    }))
  }

  const inputStartedAt = (date?: {
    type: 'year' | 'month' | 'day' | 'hour' | 'minute'
    value: string
  }) => {
    if (!/^\d*$/.test(date.value)) return
    if (!checkLange(date)) return
    const replaceValue = Number(date.value)

    setStartedAt(prevState => ({
      ...prevState,
      value: {
        year: date.type == 'year' ? replaceValue : prevState.value.year,
        month: date.type == 'month' ? replaceValue : prevState.value.month,
        day: date.type == 'day' ? replaceValue : prevState.value.day,
        hour: date.type == 'hour' ? replaceValue : prevState.value.hour,
        minute: date.type == 'minute' ? replaceValue : prevState.value.minute,
      },
    }))
  }

  const inputEndedAt = (date?: {
    type: 'year' | 'month' | 'day' | 'hour' | 'minute'
    value: string
  }) => {
    if (!/^\d*$/.test(date.value)) return
    if (!checkLange(date)) return
    const replaceValue = Number(date.value)

    setEndedAt(prevState => ({
      ...prevState,
      value: {
        year: date.type == 'year' ? replaceValue : prevState.value.year,
        month: date.type == 'month' ? replaceValue : prevState.value.month,
        day: date.type == 'day' ? replaceValue : prevState.value.day,
        hour: date.type == 'hour' ? replaceValue : prevState.value.hour,
        minute: date.type == 'minute' ? replaceValue : prevState.value.minute,
      },
    }))
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

    let copyStartedAt = { ...startedAt }
    let copyEndedAt = { ...endedAt }

    if (type == scheduleType.TASK) {
      copyStartedAt = {
        ...startedAt,
        value: {
          ...startedAt.value,
          hour: 0,
          minute: 0,
        },
      }

      copyEndedAt = {
        ...endedAt,
        value: {
          ...endedAt.value,
          hour: 23,
          minute: 59,
        },
      }
    }

    setStartedAt(copyStartedAt)
    setEndedAt(copyEndedAt)

    const scheduleStartedAt = getDate(copyStartedAt.value)
    const scheduleEndedAt = getDate(copyEndedAt.value)

    if (scheduleStartedAt.isAfter(scheduleEndedAt)) {
      setStartedAt(prevState => ({ ...prevState, error: 'started is after then endedAt' }))
      console.log('started is after then endedAt')
      return
    }

    const schedule = new Schedule({
      id: null,
      type: type,
      title: title.value,
      contents: contents.value,
      startedAt: dateToString(scheduleStartedAt),
      endedAt: dateToString(scheduleEndedAt),
      isImportant: isImportant,
      createdAt: dateToString(now),
      updatedAt: dateToString(now),
    })

    // add request
    schedule.id = await scheduleRepository.add(schedule)
    addSchedules(schedule)

    init()
    closeAddPopup()
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
    type,
    title,
    contents,
    isAllDay,
    isImportant,
    startedAt,
    endedAt,
    closeAddPopup,
    currentDate,
    init,
    setEvent,
    removeEvent,
    toggleType,
    inputTitle,
    inputContents,
    toggleAllDay,
    toggleImportant,
    inputStartedAt,
    inputEndedAt,
    addSchedule,
  }
}

export default useScheduleAddPopupViewModel
