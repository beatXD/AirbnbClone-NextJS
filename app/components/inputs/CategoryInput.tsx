"use client"

import { FC } from "react"
import { IconType } from "react-icons"

interface CategoryInputProps {
  onClick: (value: string) => void
  icon: IconType
  label: string
  selected?: boolean
}

const CategoryInput: FC<CategoryInputProps> = ({
  onClick,
  icon: Icon,
  label,
  selected
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-4
        transition
        hover:border-black
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-bold">{label}</div>
    </div>
  )
}

export default CategoryInput
