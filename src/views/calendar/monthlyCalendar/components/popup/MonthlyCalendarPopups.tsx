import React from 'react'
import useMonthlyCalendarPopupsViewModel from '@views/calendar/monthlyCalendar/components/popup/useMonthlyCalendarPopupsViewModel'
import MonthlyCalendarAddPopup from '@views/calendar/monthlyCalendar/components/popup/monthlyCalendarAddPopup/MonthlyCalendarAddPopup'
import MonthlyCalendarDatePopup from '@views/calendar/monthlyCalendar/components/popup/monthlyCalendarDatePopup/MonthlyCalendarDatePopup'
import MonthlyCalendarModifyPopup from '@views/calendar/monthlyCalendar/components/popup/monthlyCalendarModifyPopup/MonthlyCalendarModifyPopup'

const MonthlyCalendarPopups = () => {
  const { selectedDateIndex, selectedSchedule, isOpenAddPopup } =
    useMonthlyCalendarPopupsViewModel()
  return (
    <>
      {isOpenAddPopup && <MonthlyCalendarAddPopup />}
      {selectedDateIndex && <MonthlyCalendarDatePopup />}
      {selectedSchedule && <MonthlyCalendarModifyPopup />}
    </>
  )
}

export default MonthlyCalendarPopups
