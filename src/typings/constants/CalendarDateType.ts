export const calendarDateType = {
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
  DAILY: 'DAILY',
  LIST: 'LIST',
} as const

export type CalendarDateType = (typeof calendarDateType)[keyof typeof calendarDateType]
