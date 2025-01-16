import dayjs from 'dayjs'

const dateFormatUtil = {
  yyyyMMddHHmmss: 'yyyy/MM/DD HH:mm:ss',
  HHmm: 'HH:mm',
  getDate: (date?: {
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
    return dayjs(baseDate, 'YYYY/MM/DD HH:mm:ss')
  },

  getStringToDate: (date: string) => dayjs(date, 'YYYY/MM/DD HH:mm:ss'),

  getDateToString: (date: dayjs.Dayjs) => date.format('YYYY/MM/DD HH:mm:ss'),

  getTime: (hour: number, minute: number, second?: number) => {
    const formatNumber = (num: number): string => (num < 10 ? `0${num}` : `${num}`)
    let time = `${formatNumber(hour)}:${formatNumber(minute)}`
    if (second) time += `:${formatNumber(second)}`
    return time
  },
  formatNumber: (num: number): string => (num < 10 ? `0${num}` : `${num}`),
}

export default dateFormatUtil
