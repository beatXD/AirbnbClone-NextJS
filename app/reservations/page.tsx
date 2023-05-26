import getCurrentUser from "@app/actions/getCurrentUser"
import getReservations from "@app/actions/getReservations"
import ClientOnly from "@app/components/ClientOnly"
import EmptyState from "@app/components/EmptyState"
import ReservationsClient from "./ReservationsClient"

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You are not logged in"
          subtitle="Please log in to view your reservations"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id })
  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no reservations"
          subtitle="Please make a reservation to view it here"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default ReservationsPage
