export const weekday = {
  SUNDAY: { code: 0, desc: 'SUN' },
  MONDAY: { code: 1, desc: 'MON' },
  TUESDAY: { code: 2, desc: 'TUE' },
  WEDNESDAY: { code: 3, desc: 'WED' },
  THURSDAY: { code: 4, desc: 'THU' },
  FRIDAY: { code: 5, desc: 'FRI' },
  SATURDAY: { code: 6, desc: 'SAT' },
}

export const getWeekdayByCode = (code: number) => {
  switch (code) {
    case 0:
      return weekday.SUNDAY
    case 1:
      return weekday.MONDAY
    case 2:
      return weekday.TUESDAY
    case 3:
      return weekday.WEDNESDAY
    case 4:
      return weekday.THURSDAY
    case 5:
      return weekday.FRIDAY
    case 6:
      return weekday.SATURDAY
  }
}

export type Weekday = (typeof weekday)[keyof typeof weekday]
