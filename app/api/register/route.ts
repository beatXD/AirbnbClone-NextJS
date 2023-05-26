import prisma from "@app/libs/prismadb"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, name, password } = body

  const find = await prisma.user.findUnique({ where: { email } })

  if (find) {
    return NextResponse.json({
      message: "Email already exists",
      success: false
    })
  }

  const hash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { email, name, password: hash }
  })

  return NextResponse.json({
    message: "User created",
    success: true,
    user: user
  })
}
