import React, { useEffect } from 'react'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import './monthlyCalendarDatePopup.scss'
import useMonthlyCalendarDatePopupViewModel from '@views/calendar/monthlyCalendar/components/popup/monthlyCalendarDatePopup/useMonthlyCalendarDatePopupViewModel'

const MonthlyCalendarDatePopup: React.FC = () => {
  const {
    selectedDate,
    swipedSchedule,
    onClose,
    setEvent,
    removeEvent,
    handleStart,
    handleMove,
    handleEnd,
    deleteSchedule,
    openScheduleModifyPopup,
    openScheduleAddPopup,
  } = useMonthlyCalendarDatePopupViewModel()

  const { getTime } = dateFormatUtil

  useEffect(() => {
    setEvent()
    return () => {
      removeEvent()
    }
  }, [])

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  if (!selectedDate) return null

  return (
    <div className="date-popup">
      <div className="date-popup__overlay" onClick={onClose}></div>
      <div className="date-popup__content">
        <button className="date-popup__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="date-popup__title">
          {selectedDate.year}/{selectedDate.month}/{selectedDate.day}
        </h2>

        {!selectedDate.schedules.length && (
          <p className="date-popup__empty">Let's Add a schedule!</p>
        )}

        <div className="date-popup__schedule-container">
          <div className="date-popup__shedule-wrapper">
            <div className="date-popup__schedule-add">
              <div className="date-popup__schedule-add__btn" onClick={openScheduleAddPopup}>
                Add Schedule
              </div>
            </div>
          </div>
          {selectedDate.schedules
            .filter(schedule => schedule != null)
            .map(schedule => (
              <div className="date-popup__shedule-wrapper" key={schedule.id}>
                <div
                  className={`date-popup__schedule ${
                    swipedSchedule === schedule.id ? 'date-popup__schedule--swiped' : ''
                  }`}
                  onTouchStart={event => handleStart(event.touches[0].clientX)}
                  onTouchMove={event => handleMove(event.touches[0].clientX)}
                  onTouchEnd={() => handleEnd(schedule.id)}
                  onMouseDown={event => handleStart(event.clientX)}
                  onMouseMove={event => {
                    if (event.buttons === 1) handleMove(event.clientX) // 버튼을 누른 상태에서만
                  }}
                  onMouseUp={() => handleEnd(schedule.id)}>
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
                  <div className="date-popup__schedule-content">
                    {formatContent(schedule.contents)}
                  </div>
                </div>
                {swipedSchedule === schedule.id && (
                  <div className="date-popup__schedule-actions">
                    <button
                      className="date-popup__actions__button date-popup__actions__button--edit"
                      onClick={() => openScheduleModifyPopup(schedule.id)}>
                      수정
                    </button>
                    <button
                      className="date-popup__actions__button date-popup__actions__button--delete"
                      onClick={() => deleteSchedule(schedule.id)}>
                      삭제
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MonthlyCalendarDatePopup
