import dayjs from 'dayjs'

export const DayJsFormat = 'YYYY/MM/DD HH:mm:ss'

export const getDate = (date?: {
  year: number
  month?: number
  day?: number
  hour?: number
  minute?: number
}) => {
  if (!date) return dayjs()

  const { year, month, day, hour, minute } = date
  let baseDate = `${year}`
  if (month) baseDate += `/${month}`
  if (day) baseDate += `/${day}`
  if (hour) baseDate += ` ${hour}`
  if (minute) baseDate += `:${minute}`
  return dayjs(baseDate, DayJsFormat)
}

export const getStringToDate = (date: string) => dayjs(date, DayJsFormat)

export const getDateToString = (date: dayjs.Dayjs) => date.format(DayJsFormat)
