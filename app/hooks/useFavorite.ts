import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FC, MouseEvent, useCallback, useMemo } from "react"
import useLoginModal from "./useLoginModal"
import axios from "axios"
import { toast } from "react-hot-toast"

interface IUseFavorite {
  listingId: string
  currentUser?: User | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let url = `/api/favorites/${listingId}`
        const method = hasFavorite ? "delete" : "post"
        await axios({ method, url })
        router.refresh()
        toast.success("success")
      } catch (error) {
        toast.error("Something went wrong")
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  )

  return { hasFavorite, toggleFavorite }
}

export default useFavorite
