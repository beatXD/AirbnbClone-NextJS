"use client"

import { useRouter } from "next/navigation"
import { FC } from "react"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No results found",
  subtitle = "Try adjusting your search or filter to find what you're looking for.",
  showReset
}) => {
  const router = useRouter()

  return (
    <div
      className="
      flex
      h-[60vh]
      flex-col
      items-center
      justify-center
      gap-2
    "
    >
      <Heading center title={title} subtitle={subtitle} />

      <div className="mt-4 w-48">
        {showReset && (
          <Button outline label="Reset" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  )
}

export default EmptyState
