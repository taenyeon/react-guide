import React from 'react'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { weekday } from '@typings/constants/Weekday'
import WeeklyCalendarDate from '@views/calendar/weeklyCalendar/components/weeklyCalendarDate/WeeklyCalendarDate'

interface DailyCalendarBodyProps {
  calendar?: Calendar
}

const WeeklyCalendarBody: React.FC<DailyCalendarBodyProps> = ({ calendar }) => {
  const weekDays = Object.values(weekday).map(value => value.desc)

  const now = dateFormatUtil.getDate()

  const { getTime } = dateFormatUtil

  const hours = Array.from({ length: 24 }, (_, index) => index)

  const getColorClass = (weekday: string) => {
    if (weekday == 'SUN') return 'weekly-calendar__cell--holiday'
    if (weekday == 'SAT') return 'weekly-calendar__cell--saturday'
    return ''
  }

  return (
    <>
      <div className="weekly-calendar__header">
        <div className="weekly-calendar__day">TIME</div>
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
        <div className="weekly-calendar__cell">
          <div className="weekly-calendar__cell-wrapper">
            {hours.map(hour => (
              <div className="weekly-calendar__row-header">{getTime(hour, 0)}</div>
            ))}
          </div>
        </div>
        {calendar.dates.map((date, index) => {
          return (
            <WeeklyCalendarDate key={index} date={date} isOtherYear={date.year != now.year()} />
          )
        })}
      </div>
    </>
  )
}

export default WeeklyCalendarBody
