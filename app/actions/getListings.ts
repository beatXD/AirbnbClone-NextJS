import prisma from "@app/libs/prismadb"

export interface IListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  category?: string
  startDate?: string
  endDate?: string
  locationValue?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      category,
      startDate,
      endDate,
      locationValue
    } = params

    let query: any = {}

    if (userId) query.userId = userId
    if (guestCount) query.guestCount = { gte: +guestCount }
    if (roomCount) query.roomCount = { gte: +roomCount }
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount }
    if (category) query.category = category

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    if (locationValue) query.locationValue = locationValue

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" }
    })

    return listings
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}
