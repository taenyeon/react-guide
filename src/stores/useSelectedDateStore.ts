import { DateOfCalendar } from '@typings/DateOfCalendar'
import { create } from 'zustand/react'

interface SelectedDateStore {
  selectedDate: null | DateOfCalendar
  selectDate: (selectedDate: DateOfCalendar) => void
  unselectDate: () => void
}

const useSelectedDateStore = create<SelectedDateStore>(set => ({
  selectedDate: null,
  selectDate: selectedDate => set({ selectedDate }),
  unselectDate: () => set({ selectedDate: null }),
}))

export default useSelectedDateStore
