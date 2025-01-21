import { DateOfCalendar } from '@typings/DateOfCalendar'
import { create } from 'zustand/react'
import { Schedule } from '@typings/Schedule'
import { calendarDateType, CalendarDateType } from '@typings/constants/CalendarDateType'

interface SelectedDateStore {
  selectedCalendarType: CalendarDateType
  selectCalendarType: (selectedCalendarType: CalendarDateType) => void

  currentDate: DateOfCalendar
  setCurrentDate: (currentDate: DateOfCalendar) => void

  selectedDateIndex: null | number
  selectDate: (selectedDateIndex: number) => void
  unselectDate: () => void

  selectedSchedule: null | Schedule
  selectSchedule: (selectedSchedule: Schedule) => void
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

  selectedDateIndex: null,
  selectDate: selectedDateIndex => set({ selectedDateIndex }),
  unselectDate: () => set({ selectedDateIndex: null }),

  selectedSchedule: null,
  selectSchedule: selectedSchedule => set({ selectedSchedule }),
  unselectSchedule: () => set({ selectedSchedule: null }),

  isOpenAddPopup: false,
  openAddPopup: () => set({ isOpenAddPopup: true }),
  closeAddPopup: () => set({ isOpenAddPopup: false }),

  clearSelected: () => set({ selectedDateIndex: null, selectSchedule: null }),
}))

export default useCalendarSelectStore
