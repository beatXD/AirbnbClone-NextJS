import getCurrentUser from "@app/actions/getCurrentUser"
import ClientOnly from "@app/components/ClientOnly"
import EmptyState from "@app/components/EmptyState"
import getListings from "@app/actions/getListings"
import PropertiesClient from "./PropertiesClient"

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="You are not logged in"
          subtitle="Log in to view your properties"
        />
      </ClientOnly>
    )
  }

  const listings = await getListings({ userId: currentUser.id })
  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState
          title="You have no properties"
          subtitle="Book a listing to get started"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
