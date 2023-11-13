import * as React from "react"

export type DropDownIconProps = {
    style?: React.CSSProperties
}

export const DropDownIcon = ({style} : DropDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    className="icon"
    viewBox="0 0 1024 1024"
    style={style}
  >
    <path d="M903.232 256 960 306.432 512 768 64 306.432 120.768 256 512 659.072z" />
  </svg>
)

