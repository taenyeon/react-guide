import React, { useEffect } from 'react'
import useWeeklyCalendarViewModel from '@views/calendar/weeklyCalendar/useWeeklyCalendarViewModel'
import SchedulePopups from '@views/calendar/popup/SchedulePopups'
import WeeklyCalendarHeader from '@views/calendar/weeklyCalendar/components/weeklyCalendarHeader/WeeklyCalendarHeader'
import WeeklyCalendarBody from '@views/calendar/weeklyCalendar/components/weeklyCalendarBody/WeeklyCalendarBody'
import './weeklyCalendarPage.scss'

const WeeklyCalendarPage: React.FC = () => {
  const { calculatedWeeklyCalendar: calendar, currentDate, init } = useWeeklyCalendarViewModel()

  useEffect(() => {
    if (
      calendar == null ||
      calendar.type != 'WEEKLY' ||
      !(
        currentDate.year == calendar.year &&
        currentDate.month == calendar.month &&
        currentDate.day == calendar.day
      )
    )
      init()
  }, [currentDate])

  return (
    <div className="weekly-calendar">
      <WeeklyCalendarHeader />
      <WeeklyCalendarBody calendar={calendar} />
      <SchedulePopups />
    </div>
  )
}

export default WeeklyCalendarPage
