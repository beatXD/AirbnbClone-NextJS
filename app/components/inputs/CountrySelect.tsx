"use client"

import useCountries from "@app/hooks/useCountries"
import { FC } from "react"
import Select from "react-select"

export type CountrySelectValue = {
  label: string
  value: string
  flag: string
  latlng: number[]
  region: string
}

interface CountrySelectProps {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()
  return (
    <div>
      <Select
        classNames={{
          control: () => "border-2 p-3",
          input: () => "text-lg",
          option: () => "text-lg"
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6"
          }
        })}
        placeholder="Any where"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500"> {option.region}</span>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default CountrySelect
