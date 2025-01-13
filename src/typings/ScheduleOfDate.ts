export class ScheduleOfDate {
  id: number
  year: number
  month: number
  date: number

  startHour: number
  startMinute: number

  endHour: number
  endMinute: number

  title: string
  contents: string

  createdAt: string
  updatedAt: string

  constructor(
    id: number,
    year: number,
    month: number,
    date: number,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
    title: string,
    contents: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id
    this.year = year
    this.month = month
    this.date = date
    this.startHour = startHour
    this.startMinute = startMinute
    this.endHour = endHour
    this.endMinute = endMinute
    this.title = title
    this.contents = contents
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  get startPercentage() {
    return ((this.startHour * 60 + this.startMinute) / 1440) * 100
  }

  get endPercentage() {
    return ((this.endHour * 60 + this.endMinute) / 1440) * 100
  }
}
