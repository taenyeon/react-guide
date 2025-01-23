export const scheduleType = {
  TIME: 'TIME',
  TASK: 'TASK',
} as const

export type ScheduleType = (typeof scheduleType)[keyof typeof scheduleType]
