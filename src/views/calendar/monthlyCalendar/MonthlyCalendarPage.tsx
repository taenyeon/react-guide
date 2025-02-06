import React, { useEffect } from 'react'
import useMonthlyCalendarViewModel from '@views/calendar/monthlyCalendar/useMonthlyCalendarViewModel'
import './monthlyCalendarPage.scss'
import MonthlyCalendarHeader from '@views/calendar/monthlyCalendar/components/monthlyCalendarHeader/MonthlyCalendarHeader'
import MonthlyCalendarBody from '@views/calendar/monthlyCalendar/components/monthlyCalendarBody/MonthlyCalendarBody'
import SchedulePopups from '@views/calendar/popup/SchedulePopups'

const MonthlyCalendarPage: React.FC = () => {
  const { calculatedMonthlyCalendar: calendar, currentDate, init } = useMonthlyCalendarViewModel()

  useEffect(() => {
    if (
      calendar == null ||
      calendar.type != 'MONTHLY' ||
      !(currentDate.year == calendar.year && currentDate.month == calendar.month)
    )
      init()
  }, [currentDate])

  if (!calendar) return null

  return (
    <>
      <div className="monthly-calendar">
        <MonthlyCalendarHeader />
        <MonthlyCalendarBody calendar={calendar} />
        <SchedulePopups />
      </div>
    </>
  )
}

export default MonthlyCalendarPage
