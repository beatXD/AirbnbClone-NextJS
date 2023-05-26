import getCurrentUser from "@app/actions/getCurrentUser"
import getReservations from "@app/actions/getReservations"
import ClientOnly from "@app/components/ClientOnly"
import EmptyState from "@app/components/EmptyState"
import TripsClient from "./TripsClient"

const TripsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You are not logged in"
          subtitle="Log in to view your trips"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ userId: currentUser.id })
  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no trips"
          subtitle="Book a listing to get started"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default TripsPage
