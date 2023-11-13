import * as React from "react"
import { HorizontalDirection, HorizontalDirectionIntoTransform } from "../GeneralUtils/DirectionUtils"

export type DoubleArrowIconProps = {
    arrowDirection: HorizontalDirection
}


export const DoubleArrowIcon = ( {arrowDirection} : DoubleArrowIconProps ) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    viewBox="0 0 32 32"
    width={64}
    height={64}
    transform={HorizontalDirectionIntoTransform[arrowDirection]}
  >
    <path d="m15 8-8 8 8 8M23 8l-8 8 8 8" />
  </svg>
)

