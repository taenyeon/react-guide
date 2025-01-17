import { DateOfCalendar } from '@typings/DateOfCalendar'
import { create } from 'zustand/react'
import { Schedule } from '@typings/Schedule'

interface SelectedDateStore {
  selectedDate: null | DateOfCalendar
  selectedSchedule: null | Schedule
  selectDate: (selectedDate: DateOfCalendar) => void
  unselectDate: () => void
  selectSchedule: (selectedSchedule: Schedule) => void
  unselectSchedule: () => void
  clearSelected: () => void
}

const useCalendarSelectStore = create<SelectedDateStore>(set => ({
  selectedDate: null,
  selectedSchedule: null,
  selectDate: selectedDate => set({ selectedDate }),
  unselectDate: () => set({ selectedDate: null }),
  selectSchedule: selectedSchedule => set({ selectedSchedule }),
  unselectSchedule: () => set({ selectedSchedule: null }),
  clearSelected: () => set({ selectedDate: null, selectSchedule: null }),
}))

export default useCalendarSelectStore
