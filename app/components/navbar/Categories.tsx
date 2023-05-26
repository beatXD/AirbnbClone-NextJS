"use client"

import Container from "../Container"

import { IoDiamond } from "react-icons/io5"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"

import CategoryBox from "../CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "this property is near the beach"
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "this property is near the Windmills"
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "this property is near the Modern"
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "this property is near the Countryside"
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "this property is near the Pools"
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "this property is near the Island"
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "this property is near the Lake"
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "this property is near the Skiing"
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "this property is near the Castles"
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "this property is near the Camping"
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "this property is near the Arctic"
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "this property is near the Cave"
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "this property is near the Desert"
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "this property is near the Barns"
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "this property is near the Luxurious"
  }
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div className="pt4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => {
          return (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              description={item.description}
              selected={item.label === category}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Categories
