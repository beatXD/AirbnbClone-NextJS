"use client"

import Container from "@app/components/Container"
import Heading from "@app/components/Heading"
import ListingCard from "@app/components/listings/ListingCard"
import { Listing, Reservation, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import { toast } from "react-hot-toast"

interface ReservationsClientProps {
  reservations: Reservation[] & { Listing: Listing }
  currentUser?: User | null
}

const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState("")

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeleteId(id)

        await axios.delete(`/api/reservations/${id}`)

        toast.success("Reservation cancelled successfully")
        router.refresh()
        setDeleteId("")
      } catch (error) {
        toast.error("Something went wrong")
        setDeleteId("")
      }
    },
    [router]
  )

  return (
    <Container>
      <Heading
        title="Your Reservations"
        subtitle="View your reservations here"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation?.Listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deleteId === reservation.id}
              actionLabel="Cancel"
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default ReservationsClient
