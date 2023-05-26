"use client"

import useRentModal from "@app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import CountrySelect from "../inputs/CountrySelect"
import Map from "../Map"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

enum STEP {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEP.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: ""
    }
  })

  const category = watch("category")
  const location = watch("location")
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")
  const imageSrc = watch("imageSrc")

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (step !== STEP.PRICE) {
        return onNext()
      }

      setIsLoading(true)

      const response = await axios.post("/api/listings", data)
      if (response) {
        toast.success("listing created successfully")
        router.refresh()
        reset()
        setStep(STEP.CATEGORY)
        rentModal.onClose()
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
      setIsLoading(false)
    }
  }

  const actionLabel = useMemo(() => {
    if (step === STEP.PRICE) {
      return "Create"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.CATEGORY) {
      return undefined
    }

    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => {
          return (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          )
        })}
      </div>
    </div>
  )

  if (step === STEP.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
          subtitle="Help guests find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some details about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you allow"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you allow"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    )
  }

  if (step === STEP.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Upload some photos of your place"
          subtitle="Showcase your place"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    )
  }

  if (step === STEP.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          error={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          error={errors}
          required
        />
      </div>
    )
  }

  if (step === STEP.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, let's set your price"
          subtitle="How much do you want to charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
          disabled={isLoading}
          register={register}
          error={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEP.CATEGORY ? undefined : onBack}
      title="Airbnb Your Home"
      body={bodyContent}
    />
  )
}

export default RentModal
