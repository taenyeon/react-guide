import React from 'react'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import useMonthlyCalendarDateViewModel from '@views/calendar/monthlyCalendar/components/monthlyCalendarDate/useMonthlyCalendarDateViewModel'

interface MonthlyCalendarDateProps {
  date: DateOfCalendar
  isOtherYear: boolean
}

const WeeklyCalendarDate: React.FC<MonthlyCalendarDateProps> = ({ date, isOtherYear }) => {
  const { selectDay } = useMonthlyCalendarDateViewModel()
  let colorClass = ''
  if (isOtherYear) colorClass = 'weekly-calendar__cell--other-month'

  const hours = Array.from({ length: 24 }, (_, index) => index)
  const schedules = date.schedules.filter(schedule => schedule != null)

  return (
    <div className={`weekly-calendar__cell ${colorClass}`} onClick={() => selectDay(date)}>
      <div className="weekly-calendar__cell-wrapper">
        {hours.map(hour => (
          <div className="weekly-calendar__cell-time">
            {schedules != null &&
              schedules
                .filter(
                  schedule =>
                    !schedule.isAllDay && schedule.startHour <= hour && schedule.endHour >= hour,
                )
                .map(schedule => <div className="weekly-calendar__schedule">{schedule.title}</div>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyCalendarDate
