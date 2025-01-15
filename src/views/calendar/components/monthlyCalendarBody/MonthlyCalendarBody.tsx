import React from 'react'
import { Calendar } from '@typings/Calendar'
import { weekday } from '@typings/constants/Weekday'
import MonthlyCalendarDate from '@views/calendar/components/monthlyCalendarDate/MonthlyCalendarDate'
import dateFormatUtil from '@utils/date/dateFormatUtil'

interface MonthlyCalendarBodyProps {
  calendar?: Calendar
}

const MonthlyCalendarBody: React.FC<MonthlyCalendarBodyProps> = ({ calendar }) => {
  const weekDays = Object.values(weekday).map(value => value.desc)
  const now = dateFormatUtil.getDate()
  return (
    <>
      <div className="monthly-calendar__header">
        {weekDays.map((weekday, index) => (
          <div
            key={index}
            className="monthly-calendar__day"
            style={{ color: weekday == 'SUN' ? 'red' : '' }}>
            {weekday}
          </div>
        ))}
      </div>
      <div className="monthly-calendar__body">
        {calendar.dates.map((date, index) => {
          return (
            <MonthlyCalendarDate
              key={index}
              date={date}
              now={now}
              isOtherMonth={date.month != calendar.month}
            />
          )
        })}
      </div>
    </>
  )
}

export default MonthlyCalendarBody
