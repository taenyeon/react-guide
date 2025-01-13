import React, { useEffect } from 'react'
import useMonthlyCalendarViewModel from '@views/calendar/useMonthlyCalendarViewModel'
import { weekday } from '@typings/constants/Weekday'
import './monthlyCalendarPage.scss'
import { getDate } from '@utils/date/dayJsFormat'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'

const MonthlyCalendarPage: React.FC = () => {
  const { calendar, init, next, prev } = useMonthlyCalendarViewModel()
  const weekDays = Object.values(weekday).map(value => value.desc)
  const formatNumber = (num: number): string => (num < 10 ? `0${num}` : `${num}`)
  const now = getDate()

  useEffect(() => {
    init()
  }, [])

  if (!calendar) return <div></div>

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
          let nextDateSchedules = []
          if (index != 0) nextDateSchedules = calendar.dates[index - 1].schedules
          let colorClass = ''
          if (date.isHoliday) colorClass = 'monthly-calendar__cell--holiday'
          if (date.isSaturday) colorClass = 'monthly-calendar__cell--saturday'
          if (date.month != calendar.month) colorClass = 'monthly-calendar__cell--other-month'
          return (
            <div key={index} className={`monthly-calendar__cell ${colorClass}`}>
              <div className="monthly-calendar__cell-date">
                {date.isToday(now) ? (
                  <div className="monthly-calendar__reddot">{date.day}</div>
                ) : (
                  <div>{date.day}</div>
                )}
              </div>
              <div className={'monthly-calendar__cell-schedules'}>
                {date.schedules.map((schedule: ScheduleOfDate, index) => {
                  const hasOtherSchedule = nextDateSchedules.filter(
                    nextSchedule => nextSchedule.id == schedule.id,
                  ).length
                  return (
                    <div key={index} className={`monthly-calendar__schedule`}>
                      {!hasOtherSchedule && (
                        <>
                          <div className="monthly-calendar__schedule__title">{schedule.title}</div>
                          <div className="monthly-calendar__schedule__time">
                            {formatNumber(schedule.startHour)}:{formatNumber(schedule.startMinute)}{' '}
                            ~ {formatNumber(schedule.endHour)}:{formatNumber(schedule.endMinute)}
                          </div>
                        </>
                      )}
                      <div
                        className="monthly-calendar__schedule__line"
                        style={{
                          left: `${schedule.startPercentage}%`,
                          width: `${schedule.endPercentage - schedule.startPercentage}%`,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthlyCalendarPage
