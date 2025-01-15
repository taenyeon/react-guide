import React from 'react'
import useMonthlyCalendarAddPopupViewModel from '@views/calendar/components/monthlyCalendarAddPopup/UseMonthlyCalendarAddPopupViewModel'
import './monthlyCalendarAddPopup.scss'

interface MonthlyCalendarAddPopupProps {
  isOpen: boolean
  onClose: () => void
}

const MonthlyCalendarAddPopup: React.FC<MonthlyCalendarAddPopupProps> = ({ isOpen, onClose }) => {
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
  } = useMonthlyCalendarAddPopupViewModel()

  if (!isOpen) return null

  return (
    <div className="popup">
      <div className="popup__overlay" onClick={onClose}></div>
      <div className="popup__content">
        <h2 className="popup__title">Event Form</h2>
        <form className="popup__form">
          <label className="popup__label">
            Title:
            <input
              type="text"
              className="popup__input"
              value={title.value}
              onChange={e => inputTitle(e.target.value)}
            />
          </label>
          <label className="popup__label">
            Description:
            <textarea
              className="popup__textarea"
              value={contents.value}
              onChange={e => inputContents(e.target.value)}
            />
          </label>
          <fieldset className="popup__fieldset">
            <legend className="popup__legend">Start Date:</legend>
            <div className="popup__row">
              {dateTypes.map(field => (
                <input
                  key={field}
                  type="text"
                  className="popup__input-inline"
                  placeholder={field}
                  value={startedAt.value[field as keyof typeof startedAt.value]}
                  onChange={e => inputStartedAt({ type: field, value: e.target.value })}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="popup__fieldset">
            <legend className="popup__legend">End Date:</legend>
            <div className="popup__row">
              {dateTypes.map(field => (
                <input
                  key={field}
                  type="text"
                  className="popup__input-inline"
                  placeholder={field}
                  value={endedAt.value[field as keyof typeof endedAt.value]}
                  onChange={e => inputEndedAt({ type: field, value: e.target.value })}
                />
              ))}
            </div>
          </fieldset>
          <button type="submit" className="popup__button">
            Submit
          </button>
        </form>
        <button className="popup__close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  )
}

export default MonthlyCalendarAddPopup
