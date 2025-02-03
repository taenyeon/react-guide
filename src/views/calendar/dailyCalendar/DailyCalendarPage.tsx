import React, { useEffect } from 'react'
import useDailyCalendarViewModel from '@views/calendar/dailyCalendar/useDailyCalendarViewModel'
import MonthlyCalendarPopups from '@views/calendar/monthlyCalendar/components/popup/MonthlyCalendarPopups'
import './dailyCalendarPage.scss'
import DailyCalendarHeader from '@views/calendar/dailyCalendar/components/dailyCalendarHeader/DailyCalendarHeader'
import DailyCalendarBody from '@views/calendar/dailyCalendar/components/dailyCalendarBody/DailyCalendarBody'

const DailyCalendarPage: React.FC = () => {
  const { calculatedDailyCalendar: calendar, currentDate, init } = useDailyCalendarViewModel()

  useEffect(() => {
    if (
      calendar == null ||
      calendar.type != 'DAILY' ||
      !(
        currentDate.year == calendar.year &&
        currentDate.month == calendar.month &&
        currentDate.day == calendar.day
      )
    )
      init()
  }, [currentDate])

  return (
    <div className="daily-calendar">
      <DailyCalendarHeader />
      <DailyCalendarBody calendar={calendar} />
      <MonthlyCalendarPopups />
    </div>
  )
}
export default DailyCalendarPage
