import React from 'react'
import useMonthlyCalendarViewModel from '@views/calendar/useMonthlyCalendarViewModel'
import { weekday } from '@typings/constants/Weekday'
import './monthlyCalendarPage.scss'
import dayjs from 'dayjs'

const MonthlyCalendarPage: React.FC = () => {
  const { calendar, next, prev } = useMonthlyCalendarViewModel()
  const weekDays = Object.values(weekday).map(value => value.desc)
  const now = dayjs()

  return (
    <div className="monthly-calendar">
      <div className="monthly-calendar__controls">
        <button className="monthly-calendar__button" onClick={prev}>
          {'<'}
        </button>
        <div className="monthly-calendar__title">
          {calendar.year}년 {calendar.month}월
        </div>
        <button className="monthly-calendar__button" onClick={next}>
          {'>'}
        </button>
      </div>

      <div className="monthly-calendar__header">
        {weekDays.map((weekday, index) => (
          <div key={index} className="monthly-calendar__day">
            {weekday}
          </div>
        ))}
      </div>

      <div className="monthly-calendar__body">
        {calendar.dates.map((date, index) => {
          let colorClass = ''
          if (date.isHoliday) colorClass = 'monthly-calendar__cell--holiday'
          if (date.isSaturday) colorClass = 'monthly-calendar__cell--saturday'
          if (date.month != calendar.month) colorClass = 'monthly-calendar__cell--other-month'
          return (
            <div key={index} className={`monthly-calendar__cell ${colorClass}`}>
              {date.isToday(now) ? (
                <div className="monthly-calendar__reddot">{date.day}</div>
              ) : (
                date.day
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthlyCalendarPage
