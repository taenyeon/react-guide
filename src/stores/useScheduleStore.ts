import { Schedule } from '@typings/Schedule'
import { create } from 'zustand/react'

interface ScheduleStore {
  schedules: Schedule[]
  setSchedules: (schedules: Schedule[]) => void
  addSchedules: (schedule: Schedule) => void
  deleteSchedules: (id: number) => void
  modifySchedules: (id: number, schedule: Schedule) => void
}

const useScheduleStore = create<ScheduleStore>(set => ({
  schedules: [],
  setSchedules: schedules => set({ schedules }),
  addSchedules: schedule => set(state => ({ schedules: [...state.schedules, schedule] })),
  deleteSchedules: id =>
    set(state => ({ schedules: [...state.schedules.filter(schedule => schedule.id != id)] })),
  modifySchedules: (id, schedule) => {
    set(state => ({
      schedules: state.schedules.map(stateSchedule =>
        stateSchedule.id == id ? schedule : stateSchedule,
      ),
    }))
  },
}))

export default useScheduleStore
