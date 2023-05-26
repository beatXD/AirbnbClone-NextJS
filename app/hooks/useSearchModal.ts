import { create } from "zustand"

interface UseSearchModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSearchModal = create<UseSearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useSearchModal
