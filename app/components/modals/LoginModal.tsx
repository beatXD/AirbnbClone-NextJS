"use client"

import { signIn } from "next-auth/react"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useRegisterModal from "@app/hooks/useRegisterModal"
import useLoginModal from "@app/hooks/useLoginModal"

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)

      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (response?.error) {
        toast.error(response.error)
        setIsLoading(false)
        return
      }

      toast.success("Logged in successfully.")
      router.refresh()
      loginModal.onClose()
      setIsLoading(false)
      return
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
      setIsLoading(false)
    }
  }

  const toggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        error={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />

      <div className="mt-4 text-center font-light text-neutral-500">
        <div
          className="
            flex
            flex-row
            items-center
            justify-center
            gap-2
          "
        >
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-500 hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
