import React, { KeyboardEvent, useEffect } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import './monthlyCalendarDatePopup.scss'
import useCalendarStore from '@stores/useCalendarStore'

const MonthlyCalendarDatePopup: React.FC = () => {
  const { selectedDate, unselectDate } = useCalendarStore()
  const { getTime } = dateFormatUtil

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == 'Escape') unselectDate()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!selectedDate) return null
  return (
    <div className="date-popup">
      <div className="date-popup__overlay" onClick={unselectDate}></div>
      <div className="date-popup__content">
        <button className="date-popup__close" onClick={unselectDate}>
          &times;
        </button>
        <h2 className="date-popup__title">
          {selectedDate.year}/{selectedDate.month}/{selectedDate.day}
        </h2>

        {selectedDate.schedules.length > 0 ? (
          <div className="date-popup__schedule-container">
            {selectedDate.schedules
              .filter(schedule => schedule != null)
              .map(schedule => (
                <div className="date-popup__schedule" key={schedule.id}>
                  <div className="date-popup__schedule-header">
                    <div className="date-popup__schedule-title">{schedule.title}</div>
                    <div className="date-popup__schedule-details">
                      {schedule.isAllDay && (
                        <span className="date-popup__schedule-multi">종일</span>
                      )}
                      <span className="date-popup__schedule-date">
                        {getTime(schedule.startHour, schedule.startMinute)} ~{' '}
                        {getTime(schedule.endHour, schedule.endMinute)}
                      </span>
                    </div>
                  </div>
                  <div className="date-popup__schedule-content">{schedule.contents}</div>
                </div>
              ))}
          </div>
        ) : (
          <p>No schedules available</p>
        )}
      </div>
    </div>
  )
}

export default MonthlyCalendarDatePopup
