import React, { useEffect } from 'react'
import './monthlyCalendarAddPopup.scss'
import useMonthlyCalendarAddPopupViewModel from '@views/calendar/monthlyCalendar/components/popup/monthlyCalendarAddPopup/useMonthlyCalendarAddPopupViewModel'
import { ScheduleType, scheduleType } from '@typings/constants/ScheduleType'

const MonthlyCalendarAddPopup: React.FC = () => {
  const timeDateTypes: Array<'year' | 'month' | 'day' | 'hour' | 'minute'> = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
  ]

  const taskDateTypes: Array<'year' | 'month' | 'day'> = ['year', 'month', 'day']
  const {
    isOpenAddPopup,
    type,
    title,
    contents,
    isAllDay,
    isImportant,
    startedAt,
    endedAt,
    closeAddPopup,
    currentDate,
    init,
    setEvent,
    removeEvent,
    toggleType,
    inputTitle,
    inputContents,
    toggleAllDay,
    inputStartedAt,
    inputEndedAt,
    addSchedule,
    toggleImportant,
  } = useMonthlyCalendarAddPopupViewModel()

  useEffect(() => {
    setEvent()
    init()
    return () => removeEvent()
  }, [currentDate])

  if (!isOpenAddPopup) return null

  return (
    <div className="add-popup">
      <div className="add-popup__overlay" onClick={closeAddPopup}></div>
      <div className="add-popup__content">
        <h2 className="add-popup__title">Add Schedule</h2>
        <div className="add-popup__type-button-row">
          {Object.keys(scheduleType).map((scheduleTypeValue: ScheduleType, index) => (
            <button
              key={index}
              type="button"
              className={`add-popup__type-button ${type == scheduleTypeValue ? 'add-popup__type-button--selected' : ''}`}
              onClick={() => toggleType(scheduleTypeValue)}>
              {scheduleTypeValue}
            </button>
          ))}
        </div>
        <form className="add-popup__form">
          <label className="add-popup__label">
            Title:
            <input
              type="text"
              className="add-popup__input"
              value={title.value}
              onChange={e => inputTitle(e.target.value)}
            />
          </label>
          <label className="add-popup__label">
            Description:
            <textarea
              className="add-popup__textarea"
              value={contents.value}
              onChange={e => inputContents(e.target.value)}
            />
          </label>
          <label className="add-popup__checkbox">
            <input type="checkbox" checked={isImportant} onChange={toggleImportant} />
            Important
          </label>
          {type == scheduleType.TIME && (
            <>
              <label className="add-popup__checkbox">
                <input type="checkbox" checked={isAllDay} onChange={toggleAllDay} />
                All Day
              </label>
              <fieldset className="add-popup__fieldset">
                <legend className="add-popup__legend">Start Date:</legend>
                <div className="add-popup__row">
                  {timeDateTypes.map(field => (
                    <label key={field} className="add-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="add-popup__input-inline"
                        placeholder={field}
                        value={startedAt.value[field as keyof typeof startedAt.value]}
                        onChange={e => inputStartedAt({ type: field, value: e.target.value })}
                        disabled={isAllDay}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="add-popup__fieldset">
                <legend className="add-popup__legend">End Date:</legend>
                <div className="add-popup__row">
                  {timeDateTypes.map(field => (
                    <label key={field} className="add-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="add-popup__input-inline"
                        placeholder={field}
                        value={endedAt.value[field as keyof typeof endedAt.value]}
                        onChange={e => inputEndedAt({ type: field, value: e.target.value })}
                        disabled={isAllDay}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          {type == scheduleType.TASK && (
            <>
              <fieldset className="add-popup__fieldset">
                <legend className="add-popup__legend">Start Date:</legend>
                <div className="add-popup__row">
                  {taskDateTypes.map(field => (
                    <label key={field} className="add-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="add-popup__input-inline"
                        placeholder={field}
                        value={startedAt.value[field as keyof typeof startedAt.value]}
                        onChange={e => inputStartedAt({ type: field, value: e.target.value })}
                        disabled={isAllDay}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="add-popup__fieldset">
                <legend className="add-popup__legend">End Date:</legend>
                <div className="add-popup__row">
                  {taskDateTypes.map(field => (
                    <label key={field} className="add-popup__label-inline">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                      <input
                        type="text"
                        className="add-popup__input-inline"
                        placeholder={field}
                        value={endedAt.value[field as keyof typeof endedAt.value]}
                        onChange={e => inputEndedAt({ type: field, value: e.target.value })}
                        disabled={isAllDay}
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          <button type="button" className="add-popup__button" onClick={() => addSchedule()}>
            Submit
          </button>
        </form>
        <button className="add-popup__close" onClick={closeAddPopup}>
          ×
        </button>
      </div>
    </div>
  )
}

export default MonthlyCalendarAddPopup
