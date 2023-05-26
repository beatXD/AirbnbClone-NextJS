import { NextResponse } from "next/server"
import prisma from "@app/libs/prismadb"
import getCurrentUser from "@app/actions/getCurrentUser"

export async function POST(req: Response) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }

    const body = await req.json()
    const { listingId, startDate, endDate, totalPrice } = body

    const listingAndReservations = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: { startDate, endDate, totalPrice, userId: currentUser.id }
        }
      }
    })

    return NextResponse.json({
      data: listingAndReservations,
      success: true,
      message: "Reservation created successfully"
    })
  } catch (error: any) {
    console.error(error)
    return NextResponse.error()
  }
}
