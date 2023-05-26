import { Nunito } from "next/font/google"

import "./globals.css"

import Navbar from "./components/navbar/Navbar"
import ClientOnly from "./components/ClientOnly"
import RegisterModal from "./components/modals/RegisterModal"
import LoginModal from "./components/modals/LoginModal"
import ToasterProvider from "./providers/ToasterProvider"
import getCurrentUser from "./actions/getCurrentUser"
import RentModal from "./components/modals/RentModal"
import SearchModal from "./components/modals/SearchModal"

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb Clone"
}

const font = Nunito({
  subsets: ["latin"]
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
