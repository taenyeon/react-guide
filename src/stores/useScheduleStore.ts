import { Schedule } from '@typings/Schedule'
import { create } from 'zustand/react'

interface ScheduleStore {
  schedules: Schedule[]
  setSchedules: (schedules: Schedule[]) => void
  addSchedules: (schedule: Schedule) => void
  deleteSchedules: (id: number) => void
}

const useScheduleStore = create<ScheduleStore>(set => ({
  schedules: [],
  setSchedules: schedules => set({ schedules }),
  addSchedules: schedule => set(state => ({ schedules: [...state.schedules, schedule] })),
  deleteSchedules: id =>
    set(state => ({ schedules: [...state.schedules.filter(schedule => schedule.id != id)] })),
}))

export default useScheduleStore
