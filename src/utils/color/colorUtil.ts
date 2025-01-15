const colorUtil = {
  getIndexOfColor: (index: number) => {
    const colors = [
      '#FFD1DC', // 파스텔 핑크
      '#FFEB99', // 파스텔 노랑
      '#D1E8A4', // 파스텔 라임 (연한 녹색 계열)
      '#ACE7FF', // 파스텔 하늘색
      '#C4BFFF', // 파스텔 보라
      '#FFB3E6', // 파스텔 로즈
      '#F6A6FF', // 파스텔 퍼플
      '#FFDDAA', // 파스텔 오렌지
      '#A7F3D0', // 파스텔 민트
      '#F8C8DC', // 파스텔 코랄 (부드럽고 따뜻한 느낌)
    ]
    if (index == 0) return colors[Math.floor(Math.random() * colors.length)]
    if (index > 10) return colors[Math.floor(Math.random() * colors.length)]
    return colors[index]
  },
}

export default colorUtil
