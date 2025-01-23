import { KeyboardEvent, useState } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { Schedule } from '@typings/Schedule'
import useScheduleStore from '@stores/useScheduleStore'
import useCalendarSelectStore from '@stores/useCalendarSelectStore'
import scheduleRepository from '@repositories/ScheduleRepository'
import { useShallow } from 'zustand/react/shallow'
import { scheduleType } from '@typings/constants/ScheduleType'

const useMonthlyCalendarModifyPopupViewModel = () => {
  const { getDate, dateToString, stringToDate } = dateFormatUtil

  const modifySchedules = useScheduleStore(state => state.modifySchedules)

  const { selectedSchedule, unselectSchedule } = useCalendarSelectStore(
    useShallow(state => ({
      selectedSchedule: state.selectedSchedule,
      unselectSchedule: state.unselectSchedule,
    })),
  )

  const [title, setTitle] = useState({ value: selectedSchedule.title || '', error: '' })

  const [contents, setContents] = useState({ value: selectedSchedule.contents || '', error: '' })

  const [type] = useState(selectedSchedule.type)

  const [startedAt, setStartedAt] = useState(() => {
    const startedAt = stringToDate(selectedSchedule.startedAt)
    return {
      value: {
        year: startedAt.year(),
        month: startedAt.month() + 1,
        day: startedAt.date(),
        hour: startedAt.hour(),
        minute: startedAt.minute(),
      },
      error: '',
    }
  })

  const [endedAt, setEndedAt] = useState(() => {
    const endedAt = stringToDate(selectedSchedule.endedAt)
    return {
      value: {
        year: endedAt.year(),
        month: endedAt.month() + 1,
        day: endedAt.date(),
        hour: endedAt.hour(),
        minute: endedAt.minute(),
      },
      error: '',
    }
  })

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key == 'Escape') unselectSchedule()
  }

  const setEvent = () =>
    window.addEventListener('keydown', handleKeyDown as unknown as EventListener)

  const removeEvent = () =>
    window.removeEventListener('keydown', handleKeyDown as unknown as EventListener)

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

  const modifySchedule = async () => {
    const now = getDate()
    let copyStartedAt = { ...startedAt }
    let copyEndedAt = { ...endedAt }

    if (selectedSchedule.type == scheduleType.TASK) {
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
    const scheduleStartedAt = getDate(copyStartedAt.value)
    const scheduleEndedAt = getDate(copyEndedAt.value)

    if (scheduleStartedAt.isAfter(scheduleEndedAt)) {
      setStartedAt(prevState => {
        return { ...prevState, error: 'started is after then endedAt' }
      })
      console.log('started is after then endedAt')
      return
    }

    const schedule = new Schedule({
      id: selectedSchedule.id,
      type: selectedSchedule.type,
      title: title.value,
      contents: contents.value,
      startedAt: dateToString(scheduleStartedAt),
      endedAt: dateToString(scheduleEndedAt),
      createdAt: selectedSchedule.createdAt,
      updatedAt: dateToString(now),
    })
    // add request
    await scheduleRepository.modify(schedule.id, schedule)
    modifySchedules(schedule.id, schedule)
  }

  return {
    title,
    type,
    contents,
    startedAt,
    endedAt,
    selectedSchedule,
    setEvent,
    removeEvent,
    inputTitle,
    inputContents,
    inputStartedAt,
    inputEndedAt,
    modifySchedule,
    unselectSchedule,
  }
}

export default useMonthlyCalendarModifyPopupViewModel
