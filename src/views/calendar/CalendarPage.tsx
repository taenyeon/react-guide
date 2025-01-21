import React from 'react'
import useCalendarPageViewModel from '@views/calendar/useCalendarPageViewModel'
import './calendarPage.scss'
import { calendarDateType } from '@typings/constants/CalendarDateType'
import MonthlyCalendarPage from '@views/calendar/monthlyCalendar/MonthlyCalendarPage'
import ScheduleListPage from '@views/calendar/scheduleList/ScheduleListPage'

const CalendarPage: React.FC = () => {
  const { calendarDateTypes, selectCalendarType, selectedCalendarType } = useCalendarPageViewModel()
  return (
    <div className="calendar">
      <div className="calendar__button-wrapper">
        {calendarDateTypes.map(type => (
          <button
            key={type}
            className={`calendar__type-button ${selectedCalendarType == type ? 'calendar__type-button--selected' : ''}`}
            onClick={() => selectCalendarType(type)}>
            {type}
          </button>
        ))}
      </div>
      {selectedCalendarType == calendarDateType.MONTHLY && <MonthlyCalendarPage />}
      {selectedCalendarType == calendarDateType.LIST && <ScheduleListPage />}
      {selectedCalendarType == calendarDateType.DAILY && <p>Not yet supported...</p>}
      {selectedCalendarType == calendarDateType.WEEKLY && <p>Not yet supported...</p>}
    </div>
  )
}

export default CalendarPage
