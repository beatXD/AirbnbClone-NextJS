"use client"

import { FC } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"

interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  placeholder?: string
  register: UseFormRegister<FieldValues>
  error: FieldErrors
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  placeholder,
  register,
  error
}) => {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}

      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          rounded-md
          border-2 
          bg-white
          p-4
          pt-6
          font-light
          outline-none
          transition
          disabled:cursor-not-allowed
          disabled:opacity-70
          ${formatPrice ? "pl-9" : "pl-4"}
          ${error[id] ? "border-red-500" : "border-neutral-300"}
          ${error[id] ? "focus:border-red-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          text-md
          absolute
          top-5
          z-10
          origin-[0]
          -translate-y-3
          transform
          duration-150
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-4
          peer-focus:scale-75
          ${error[id] ? "text-red-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
