import * as React from "react"
import { HorizontalDirection, HorizontalDirectionIntoTransform } from "../GeneralUtils/DirectionUtils"

export type ArrowIconProps = {
    arrowDirection: HorizontalDirection
}

export const ArrowIcon = ({arrowDirection} : ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    viewBox="0 0 32 32"
    width={64}
    height={64}
    transform={HorizontalDirectionIntoTransform[arrowDirection]}
  >
    <path d="m20 8-8 8 8 8" />
  </svg>
)


