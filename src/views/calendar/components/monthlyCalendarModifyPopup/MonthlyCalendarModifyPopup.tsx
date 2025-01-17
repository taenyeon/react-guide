import React from 'react'
import './monthlyCalendarModifyPopup.scss'
import useMonthlyCalendarModifyPopupViewModel from '@views/calendar/components/monthlyCalendarModifyPopup/useMonthlyCalendarModifyPopupViewModel'

const MonthlyCalendarModifyPopup: React.FC = () => {
  const dateTypes: Array<'year' | 'month' | 'day' | 'hour' | 'minute'> = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
  ]

  const {
    title,
    contents,
    startedAt,
    endedAt,
    inputTitle,
    inputContents,
    inputStartedAt,
    inputEndedAt,
    modifySchedule,
    unselectSchedule,
  } = useMonthlyCalendarModifyPopupViewModel()

  return (
    <div className="modify-popup">
      <div className="modify-popup__overlay" onClick={() => unselectSchedule()}></div>
      <div className="modify-popup__content">
        <h2 className="modify-popup__title">Modify Schedule</h2>
        <form className="modify-popup__form">
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
          <fieldset className="modify-popup__fieldset">
            <legend className="modify-popup__legend">Start Date:</legend>
            <div className="modify-popup__row">
              {dateTypes.map(field => (
                <input
                  key={field}
                  type="text"
                  className="modify-popup__input-inline"
                  placeholder={field}
                  value={startedAt.value[field as keyof typeof startedAt.value]}
                  onChange={e => inputStartedAt({ type: field, value: e.target.value })}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="modify-popup__fieldset">
            <legend className="modify-popup__legend">End Date:</legend>
            <div className="modify-popup__row">
              {dateTypes.map(field => (
                <input
                  key={field}
                  type="text"
                  className="modify-popup__input-inline"
                  placeholder={field}
                  value={endedAt.value[field as keyof typeof endedAt.value]}
                  onChange={e => inputEndedAt({ type: field, value: e.target.value })}
                />
              ))}
            </div>
          </fieldset>
          <div>
            <button
              type="button"
              className="modify-popup__button"
              onClick={async () => {
                await modifySchedule()
                unselectSchedule()
              }}>
              Modify
            </button>
            <button
              type="button"
              className="modify-popup__button"
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
