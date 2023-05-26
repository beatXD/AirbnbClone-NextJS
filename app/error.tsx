"use client"

import { FC, useEffect } from "react"
import EmptyState from "./components/EmptyState"

interface ErrorPageProps {
  error: Error
}

const ErrorState: FC<ErrorPageProps> = ({ error }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <EmptyState title="Oops!" subtitle="Something went wrong" />
}

export default ErrorState
