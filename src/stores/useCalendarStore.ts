import { create } from 'zustand/react'
import { Calendar } from '@typings/Calendar'

interface CalendarStore {
  calendar: Calendar
  setCalendar: (calendar: Calendar) => void
}

const useCalendarStore = create<CalendarStore>(set => ({
  calendar: null,
  setCalendar: calendar => set({ calendar }),
}))

export default useCalendarStore
