import React, { useEffect } from 'react'
import useMonthlyCalendarViewModel from '@views/calendar/monthlyCalendar/useMonthlyCalendarViewModel'
import './monthlyCalendarPage.scss'
import MonthlyCalendarHeader from '@views/calendar/monthlyCalendar/components/monthlyCalendarHeader/MonthlyCalendarHeader'
import MonthlyCalendarBody from '@views/calendar/monthlyCalendar/components/monthlyCalendarBody/MonthlyCalendarBody'
import MonthlyCalendarPopups from '@views/calendar/monthlyCalendar/components/popup/MonthlyCalendarPopups'

const MonthlyCalendarPage: React.FC = () => {
  const { calculatedMonthlyCalendar: calendar, currentDate, init } = useMonthlyCalendarViewModel()

  useEffect(() => {
    if (
      calendar == null ||
      !(currentDate.year == calendar.year && currentDate.month == calendar.month)
    )
      init()
  }, [currentDate])

  if (!calendar) return <div></div>

  return (
    <>
      <div className="monthly-calendar">
        <MonthlyCalendarHeader />
        <MonthlyCalendarBody calendar={calendar} />
        <MonthlyCalendarPopups />
      </div>
    </>
  )
}

export default MonthlyCalendarPage
