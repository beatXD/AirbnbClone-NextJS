import Container from "@app/components/Container"
import Heading from "@app/components/Heading"
import ListingCard from "@app/components/listings/ListingCard"
import { Listing, User } from "@prisma/client"
import { FC } from "react"

interface FavoritesClientProps {
  favorites: Listing[]
  currentUser?: User | null
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favorites,
  currentUser
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="Your favorites" />
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
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
