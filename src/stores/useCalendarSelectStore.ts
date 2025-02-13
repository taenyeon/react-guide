import { DateOfCalendar } from '@typings/DateOfCalendar'
import { create } from 'zustand/react'
import { calendarDateType, CalendarDateType } from '@typings/constants/CalendarDateType'

interface SelectedDateStore {
  selectedCalendarType: CalendarDateType
  selectCalendarType: (selectedCalendarType: CalendarDateType) => void

  currentDate: DateOfCalendar
  setCurrentDate: (currentDate: DateOfCalendar) => void

  selectedDate: null | DateOfCalendar
  selectDate: (selectedDate: DateOfCalendar) => void
  unselectDate: () => void

  selectedScheduleId: null | number
  selectSchedule: (selectedSchedule: number) => void
  unselectSchedule: () => void

  isOpenAddPopup: boolean
  openAddPopup: () => void
  closeAddPopup: () => void

  clearSelected: () => void
}

const useCalendarSelectStore = create<SelectedDateStore>(set => ({
  selectedCalendarType: calendarDateType.MONTHLY,
  selectCalendarType: selectedCalendarType => set({ selectedCalendarType }),

  currentDate: new DateOfCalendar(),
  setCurrentDate: currentDate => set({ currentDate }),

  selectedDate: null,
  selectDate: selectedDate => set({ selectedDate }),
  unselectDate: () => set({ selectedDate: null }),

  selectedScheduleId: null,
  selectSchedule: selectedScheduleId => set({ selectedScheduleId }),
  unselectSchedule: () => set({ selectedScheduleId: null }),

  isOpenAddPopup: false,
  openAddPopup: () => set({ isOpenAddPopup: true }),
  closeAddPopup: () => set({ isOpenAddPopup: false }),

  clearSelected: () => set({ selectedDate: null, selectSchedule: null }),
}))

export default useCalendarSelectStore
