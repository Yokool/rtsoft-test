import * as React from "react"
import { HorizontalDirection, HorizontalDirectionIntoTransform } from "../GeneralUtils/DirectionUtils"
import styled from "styled-components"

export type ArrowIconProps = {
    arrowDirection: HorizontalDirection
    onClick?: () => void
}

const CustomSvg = styled.svg`
    &:hover {
        cursor: pointer;
    }
`;

export const ArrowIcon = ({arrowDirection, onClick} : ArrowIconProps) => (
  <CustomSvg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    viewBox="0 0 32 32"
    width={64}
    height={64}
    transform={HorizontalDirectionIntoTransform[arrowDirection]}
    onClick={onClick}
  >
    <path d="m20 8-8 8 8 8" />
  </CustomSvg>
)


