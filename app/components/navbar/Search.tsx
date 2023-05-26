"use client"

import useCountries from "@app/hooks/useCountries"
import useSearchModal from "@app/hooks/useSearchModal"
import { differenceInDays } from "date-fns"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { BiSearch } from "react-icons/bi"

const Search = () => {
  const searchModal = useSearchModal()
  const { getByValue } = useCountries()
  const params = useSearchParams()

  const locationValue = params?.get("locationValue")
  const startDate = params?.get("startDate")
  const endDate = params?.get("endDate")
  const guestCount = params?.get("guestCount")

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label
    }
    return "AnyWhere"
  }, [getByValue, locationValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      console.log("start", start)
      console.log("end", end)

      let diff = differenceInDays(end, start)
      console.log("diff", diff)

      if (diff === 0) diff = 1
      return `${diff} Days`
    }

    return "AnyWeek"
  }, [endDate, startDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }

    return "AnyGuest"
  }, [guestCount])

  return (
    <div
      onClick={searchModal.onOpen}
      className="
      w-full
      cursor-pointer
      rounded-full
      border-[1px]
      py-2
      shadow-sm
      transition
      hover:shadow-md
      md:w-auto
    "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        {/* Anywhere */}
        <div
          className="
            fonr-semibold
            px-6
            text-sm
          "
        >
          {locationLabel}
        </div>

        {/* Any week */}
        <div
          className="
          hidden
          flex-1
          border-x-[1px]
          px-6
          text-center
          text-sm
          font-semibold
          sm:block
        "
        >
          {durationLabel}
        </div>

        {/* Any guest */}
        <div
          className="
            flex
            flex-row
            items-center
            gap-3
            pl-6
            pr-2
            text-sm
            text-gray-600
        "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
            rounded-full
            bg-rose-500
            p-2
            text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search