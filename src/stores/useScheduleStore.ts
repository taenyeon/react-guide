import { Schedule } from '@typings/Schedule'
import { create } from 'zustand/react'

interface ScheduleStore {
  schedules: Schedule[]
  setSchedules: (schedules: Schedule[]) => void
  addSchedules: (schedule: Schedule) => void
}

const useScheduleStore = create<ScheduleStore>(set => ({
  schedules: [],
  setSchedules: schedules => set({ schedules }),
  addSchedules: schedule => set(state => ({ schedules: [...state.schedules, schedule] })),
}))

export default useScheduleStore
