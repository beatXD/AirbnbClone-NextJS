import prisma from "@app/libs/prismadb"
import getCurrentUser from "@app/actions/getCurrentUser"
import { NextResponse } from "next/server"

interface IParams {
  listingId?: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error()
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds.push(listingId)

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: favoriteIds }
  })

  return NextResponse.json({
    success: true,
    data: user,
    message: "Listing added to favorites"
  })
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.error()
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listingId")
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds = favoriteIds.filter((id) => id !== listingId)

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: favoriteIds }
  })

  return NextResponse.json({
    success: true,
    data: user,
    message: "Listing removed from favorites"
  })
}
