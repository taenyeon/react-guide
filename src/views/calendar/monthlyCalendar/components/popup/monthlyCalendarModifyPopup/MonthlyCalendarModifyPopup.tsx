import React, { useEffect } from 'react'
import './monthlyCalendarModifyPopup.scss'
import useMonthlyCalendarModifyPopupViewModel from '@views/calendar/monthlyCalendar/components/popup/monthlyCalendarModifyPopup/useMonthlyCalendarModifyPopupViewModel'
import { scheduleType } from '@typings/constants/ScheduleType'

const MonthlyCalendarModifyPopup: React.FC = () => {
  const timeDateTypes: Array<'year' | 'month' | 'day' | 'hour' | 'minute'> = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
  ]
  const taskDateTypes: Array<'year' | 'month' | 'day'> = ['year', 'month', 'day']

  const {
    title,
    type,
    contents,
    startedAt,
    endedAt,
    setEvent,
    removeEvent,
    inputTitle,
    inputContents,
    inputStartedAt,
    inputEndedAt,
    modifySchedule,
    unselectSchedule,
  } = useMonthlyCalendarModifyPopupViewModel()

  useEffect(() => {
    setEvent()
    return () => removeEvent()
  }, [])

  return (
    <div className="modify-popup">
      <div className="modify-popup__overlay" onClick={() => unselectSchedule()}></div>
      <div className="modify-popup__content">
        <h2 className="modify-popup__title">Modify Schedule</h2>
        <form className="modify-popup__form">
          <span className="modify-popup__tag">#{type}</span>
          <label className="modify-popup__label">
            Title:
            <input
              type="text"
              className="modify-popup__input"
              value={title.value}
              onChange={e => inputTitle(e.target.value)}
            />
          </label>
          <label className="modify-popup__label">
            Description:
            <textarea
              className="modify-popup__textarea"
              value={contents.value}
              onChange={e => inputContents(e.target.value)}
            />
          </label>
          {type == scheduleType.TIME && (
            <>
              <fieldset className="modify-popup__fieldset">
                <legend className="modify-popup__legend">Start Date:</legend>
                <div className="modify-popup__row">
                  {timeDateTypes.map(field => (
                    <label key={field} className="modify-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="modify-popup__input-inline"
                        placeholder={field}
                        value={startedAt.value[field as keyof typeof startedAt.value]}
                        onChange={e => inputStartedAt({ type: field, value: e.target.value })}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="modify-popup__fieldset">
                <legend className="modify-popup__legend">End Date:</legend>
                <div className="modify-popup__row">
                  {timeDateTypes.map(field => (
                    <label key={field} className="modify-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="modify-popup__input-inline"
                        placeholder={field}
                        value={endedAt.value[field as keyof typeof endedAt.value]}
                        onChange={e => inputEndedAt({ type: field, value: e.target.value })}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          {type == scheduleType.TASK && (
            <>
              <fieldset className="modify-popup__fieldset">
                <legend className="modify-popup__legend">Start Date:</legend>
                <div className="modify-popup__row">
                  {taskDateTypes.map(field => (
                    <label key={field} className="modify-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="modify-popup__input-inline"
                        placeholder={field}
                        value={startedAt.value[field as keyof typeof startedAt.value]}
                        onChange={e => inputStartedAt({ type: field, value: e.target.value })}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="modify-popup__fieldset">
                <legend className="modify-popup__legend">End Date:</legend>
                <div className="modify-popup__row">
                  {taskDateTypes.map(field => (
                    <label key={field} className="modify-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="modify-popup__input-inline"
                        placeholder={field}
                        value={endedAt.value[field as keyof typeof endedAt.value]}
                        onChange={e => inputEndedAt({ type: field, value: e.target.value })}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          <div className="modify-popup__button-container">
            <button
              type="button"
              className="modify-popup__button modify-popup__button--modify"
              onClick={async () => {
                await modifySchedule()
                unselectSchedule()
              }}>
              Modify
            </button>
            <button
              type="button"
              className="modify-popup__button modify-popup__button--cancel"
              onClick={() => unselectSchedule()}>
              Cancel
            </button>
          </div>
        </form>
        <button className="modify-popup__close" onClick={() => unselectSchedule()}>
          ×
        </button>
      </div>
    </div>
  )
}

export default MonthlyCalendarModifyPopup
