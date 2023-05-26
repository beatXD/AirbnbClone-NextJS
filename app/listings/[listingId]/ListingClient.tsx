"use client"

import Container from "@app/components/Container"
import ListingHead from "@app/components/listings/ListingHead"
import ListingInfo from "@app/components/listings/ListingInfo"
import ListingReservation from "@app/components/listings/ListingReservation"
import { categories } from "@app/components/navbar/Categories"
import useLoginModal from "@app/hooks/useLoginModal"
import { Listing, Reservation } from "@prisma/client"
import axios from "axios"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { User } from "next-auth"
import { useRouter } from "next/navigation"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Range } from "react-date-range"
import { toast } from "react-hot-toast"

interface ListingClientProps {
  listing: Listing & { User?: User | null }
  currentUser?: User | null
  reservations?: Reservation[]
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date()
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = []
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing?.price || 0)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing?.price || 0)
      }
    }
  }, [dateRange, listing.price])

  const onCreateReservation = useCallback(async () => {
    try {
      if (!currentUser) {
        return loginModal.onOpen()
      }

      setIsLoading(true)

      const response = await axios.post("/api/reservations", {
        listingId: listing?.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice: totalPrice
      })

      toast.success("Listing Reserved Successfully")
      setDateRange(initialDateRange)
      router.push("/trips")
      setIsLoading(false)
    } catch (error) {
      toast.error("Something went wrong")
      setIsLoading(false)
    }
  }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice])

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    for (const reservation of reservations) {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate || initialDateRange.startDate),
        end: new Date(reservation.endDate || initialDateRange.endDate)
      })

      dates = [...dates, ...range]
    }

    return dates
  }, [reservations])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
            id={listing?.id}
            currentUser={currentUser}
          />

          <div
            className="
              mt-6
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
            "
          >
            <ListingInfo
              user={listing?.User}
              category={category}
              description={listing?.description}
              roomCount={listing?.roomCount}
              guestCount={listing?.guestCount}
              bathroomCount={listing?.bathroomCount}
              locationValue={listing?.locationValue}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing?.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
