import { useState } from 'react'

const useMonthlyCalendarDateViewModel = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => setIsPopupOpen(() => true)

  const closePopup = () => setIsPopupOpen(() => false)

  return {
    isPopupOpen,
    openPopup,
    closePopup,
  }
}

export default useMonthlyCalendarDateViewModel
