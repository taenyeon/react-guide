import { create } from 'zustand/react'
import { Calendar } from '@typings/Calendar'
import { DateOfCalendar } from '@typings/DateOfCalendar'

interface CalendarStore {
  calendar: Calendar
  selectedDate: null | DateOfCalendar
  setCalendar: (calendar: Calendar) => void
  selectDate: (selectedDate: DateOfCalendar) => void
  unselectDate: () => void
}

const useCalendarStore = create<CalendarStore>(set => ({
  calendar: null,
  selectedDate: null,
  setCalendar: calendar => set({ calendar }),
  selectDate: selectedDate => set({ selectedDate }),
  unselectDate: () => set({ selectedDate: null }),
}))

export default useCalendarStore
