"use client"

import useCountries from "@app/hooks/useCountries"
import { User } from "@prisma/client"
import { FC } from "react"
import { IconType } from "react-icons"
import Avatar from "../Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

interface ListingProps {
  user: User | null | undefined
  description?: string | null
  roomCount?: number | null
  guestCount?: number | null
  bathroomCount?: number | null
  category?: {
    icon: IconType
    label: string
    description: string
  }
  locationValue?: string | null
}

const Map = dynamic(() => import("../Map"), { ssr: false })

const Listing: FC<ListingProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  category,
  locationValue
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue || "")?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8 ">
      <div className="flex flex-col gap-2">
        <div
          className="
          flex
          flex-row
          items-center
          gap-2
          text-xl
          font-semibold
        "
        >
          <div>Hosted By {user?.name} </div>
          <Avatar src={user?.image || "/images/placeholder.jpg"} />
        </div>

        <div
          className="
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default Listing
