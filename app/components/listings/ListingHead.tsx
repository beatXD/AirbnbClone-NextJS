"use client"

import useCountries from "@app/hooks/useCountries"
import { User } from "@prisma/client"
import { FC } from "react"
import Heading from "../Heading"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
  id: string
  title?: string | null
  imageSrc?: string | null
  locationValue?: string | null
  currentUser?: User | null | undefined
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue || "")

  return (
    <>
      <Heading
        title={title || "No title"}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="Listing image"
          src={imageSrc || "/images/placeholder.png"}
          fill
          className="w-full object-cover"
        />

        <div className="absolute right-5 top-5 ">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
