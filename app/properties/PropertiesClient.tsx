"use client"

import Container from "@app/components/Container"
import Heading from "@app/components/Heading"
import ListingCard from "@app/components/listings/ListingCard"
import { Listing, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import { toast } from "react-hot-toast"

interface TripsClientProps {
  listings: Listing[]
  currentUser?: User | null
}

const TripsClient: FC<TripsClientProps> = ({ listings, currentUser }) => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState("")

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeleteId(id)

        await axios.delete(`/api/listings/${id}`)
        toast.success("Listing delete successfully")
        router.refresh()
        setDeleteId("")
      } catch (error) {
        setDeleteId("")
        toast.error("Something went wrong")
      }
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Your Properties" subtitle="Manage your properties" />
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
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deleteId === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default TripsClient
