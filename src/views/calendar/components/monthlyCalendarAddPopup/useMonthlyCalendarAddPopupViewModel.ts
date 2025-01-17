import { useState } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { Schedule } from '@typings/Schedule'
import scheduleRepository from '@repositories/ScheduleRepository'
import useScheduleStore from '@stores/useScheduleStore'

const useMonthlyCalendarAddPopupViewModel = () => {
  const { getDate, getDateToString } = dateFormatUtil
  const { addSchedules } = useScheduleStore()
  const [title, setTitle] = useState({ value: '', error: '' })
  const [contents, setContents] = useState({ value: '', error: '' })
  const [startedAt, setStartedAt] = useState(
    (): {
      value: {
        year: number
        month: number
        day: number
        hour: number
        minute: number
      }
      error: string
    } => {
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
    },
  )
  const [endedAt, setEndedAt] = useState(
    (): {
      value: {
        year: number
        month: number
        day: number
        hour: number
        minute: number
      }
      error: string
    } => {
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
    },
  )

  const init = () => {
    const start = getDate()
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
      startedAt: getDateToString(scheduleStartedAt),
      endedAt: getDateToString(scheduleEndedAt),
      createdAt: getDateToString(now),
      updatedAt: getDateToString(now),
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

  return {
    title,
    contents,
    startedAt,
    endedAt,
    init,
    inputTitle,
    inputContents,
    inputStartedAt,
    inputEndedAt,
    addSchedule,
  }
}

export default useMonthlyCalendarAddPopupViewModel
