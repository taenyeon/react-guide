export const calendarDateType = {
  YEARLY: 'yearly',
  MONTHLY: 'monthly',
  DAILY: 'daily',
  LIST: 'list',
} as const

export type CalendarDateType = (typeof calendarDateType)[keyof typeof calendarDateType]
