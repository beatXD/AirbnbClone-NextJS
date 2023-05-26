"use client"

import { FC } from "react"
import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalendarProps {
  value: Range
  onChange: (value: any) => void
  disabledDates?: Date[]
}

const Calendar: FC<CalendarProps> = ({ value, onChange, disabledDates }) => {
  return (
    <DateRange
      color="#262626"
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={(value) => onChange(value)}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar
