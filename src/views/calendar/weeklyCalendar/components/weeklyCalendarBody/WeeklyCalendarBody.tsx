import React from 'react'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { weekday } from '@typings/constants/Weekday'
import MonthlyCalendarDate from '@views/calendar/monthlyCalendar/components/monthlyCalendarDate/MonthlyCalendarDate'

interface DailyCalendarBodyProps {
  calendar?: Calendar
}

const WeeklyCalendarBody: React.FC<DailyCalendarBodyProps> = ({ calendar }) => {
  const weekDays = Object.values(weekday).map(value => value.desc)
  const now = dateFormatUtil.getDate()
  const getColorClass = (weekday: string) => {
    if (weekday == 'SUN') return 'weekly-calendar__cell--holiday'
    if (weekday == 'SAT') return 'weekly-calendar__cell--saturday'
    return ''
  }

  console.log('date : ', calendar.dates)
  return (
    <>
      <div className="weekly-calendar__header">
        {weekDays.map((weekday, index) => (
          <div
            key={index}
            className={`weekly-calendar__day ${getColorClass(weekday)}`}
            style={{ color: getColorClass(weekday) }}>
            {weekday}
          </div>
        ))}
      </div>
      <div className="weekly-calendar__body">
        {calendar.dates.map((date, index) => {
          return (
            <MonthlyCalendarDate
              key={index}
              index={index}
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

export default WeeklyCalendarBody
