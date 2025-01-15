import { useState } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'

const useMonthlyCalendarAddPopupViewModel = () => {
  const { getDate, formatNumber } = dateFormatUtil

  const [title, setTitle] = useState({ value: '', error: '' })
  const [contents, setContents] = useState({ value: '', error: '' })
  const [startedAt, setStartedAt] = useState(
    (): {
      value: {
        year: string
        month: string
        day: string
        hour: string
        minute: string
      }
      error: string
    } => {
      const now = getDate()
      return {
        value: {
          year: `${now.year()}`,
          month: formatNumber(now.month() + 1),
          day: formatNumber(now.date()),
          hour: formatNumber(now.hour()),
          minute: '00',
        },
        error: '',
      }
    },
  )
  const [endedAt, setEndedAt] = useState(
    (): {
      value: {
        year: string
        month: string
        day: string
        hour: string
        minute: string
      }
      error: string
    } => {
      const now = getDate().add(1, 'hour')
      return {
        value: {
          year: `${now.year()}`,
          month: formatNumber(now.month() + 1),
          day: formatNumber(now.date()),
          hour: formatNumber(now.hour()),
          minute: '00',
        },
        error: '',
      }
    },
  )

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
    if (!checkLange(date)) return
    const replaceValue = date.value

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
    if (!checkLange(date)) return
    const replaceValue = date.value

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
    switch (date.type) {
      case 'year':
        return true
      case 'month':
        return Number(date.value) <= 12
      case 'day':
        return Number(date.value) <= 31
      case 'hour':
        return Number(date.value) <= 23
      case 'minute':
        return Number(date.value) <= 59
    }
  }

  return {
    title,
    contents,
    startedAt,
    endedAt,
    inputTitle,
    inputContents,
    inputStartedAt,
    inputEndedAt,
  }
}

export default useMonthlyCalendarAddPopupViewModel
