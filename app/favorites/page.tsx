import getFavorites from "@app/actions/getFavorites"
import getCurrentUser from "@app/actions/getCurrentUser"
import ClientOnly from "@app/components/ClientOnly"
import EmptyState from "@app/components/EmptyState"
import FavoritesClient from "./FavoritesClient"

const FavoritesPage = async () => {
  const favorites = await getFavorites()
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

  if (!favorites.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no favorites"
          subtitle="Please make a favorites to view it here"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <FavoritesClient favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default FavoritesPage
