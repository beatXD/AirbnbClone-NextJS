import getCurrentUser from "@app/actions/getCurrentUser"
import prisma from "@app/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams {
  reservationId: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.error()
    }

    const { reservationId } = params
    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid reservationId")
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { Listing: { userId: currentUser.id } }
        ]
      }
    })

    return NextResponse.json({
      success: true,
      data: reservation,
      message: "Reservation deleted"
    })
  } catch (error: any) {
    throw new Error(error)
  }
}
