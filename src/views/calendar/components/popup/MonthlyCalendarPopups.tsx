import MonthlyCalendarAddPopup from '@views/calendar/components/popup/monthlyCalendarAddPopup/MonthlyCalendarAddPopup'
import MonthlyCalendarDatePopup from '@views/calendar/components/popup/monthlyCalendarDatePopup/MonthlyCalendarDatePopup'
import MonthlyCalendarModifyPopup from '@views/calendar/components/popup/monthlyCalendarModifyPopup/MonthlyCalendarModifyPopup'
import React from 'react'
import useMonthlyCalendarPopupsViewModel from '@views/calendar/components/popup/useMonthlyCalendarPopupsViewModel'

const MonthlyCalendarPopups = () => {
  const { selectedDate, selectedSchedule, isOpenAddPopup } = useMonthlyCalendarPopupsViewModel()
  return (
    <>
      {isOpenAddPopup && <MonthlyCalendarAddPopup />}
      {selectedDate && <MonthlyCalendarDatePopup />}
      {selectedSchedule && <MonthlyCalendarModifyPopup />}
    </>
  )
}

export default MonthlyCalendarPopups
