"use client"

import { AiOutlineMenu } from "react-icons/ai"
import { FC, LegacyRef, useCallback, useEffect, useRef, useState } from "react"

import useRegisterModal from "@app/hooks/useRegisterModal"
import useLoginModal from "@app/hooks/useLoginModal"

import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import { signOut } from "next-auth/react"
import { User } from "@prisma/client"
import useRentModal from "@app/hooks/useRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const menuRef = useRef<any>(null)

  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef, setIsOpen])

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    // open rent modal
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 ">
        {/*  */}
        <div
          onClick={onRent}
          className="
            hidden
            cursor-pointer
            rounded-full
            px-4
            py-3
            text-sm
            font-semibold
            transition
            hover:bg-neutral-100
            md:block
          "
        >
          Airbnb Your Home
        </div>

        {/*  */}
        <div
          onClick={toggleOpen}
          className="
            flex
            cursor-pointer
            flex-row
            items-center
            gap-3
            rounded-full
            border-[1px]
            border-neutral-200
            p-4
            transition
            hover:shadow-sm
            md:px-2
            md:py-1
          "
        >
          <AiOutlineMenu />

          {/*  */}
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {/* Sub Menu*/}

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-12
            w-[40vw]
            overflow-hidden
            rounded-xl
            bg-white
            text-sm
            shadow-md
            md:w-3/4
          "
        >
          <div
            className="
            flex
            cursor-pointer
            flex-col
            "
          >
            {currentUser ? (
              <div ref={menuRef}>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb My Home" />

                <hr />
                <MenuItem onClick={signOut} label="Logout" />
              </div>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
