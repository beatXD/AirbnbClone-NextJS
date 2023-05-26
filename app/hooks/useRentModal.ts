import { create } from "zustand"

interface UseRentModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useRentModal = create<UseRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useRentModal
