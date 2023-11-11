import * as React from "react"

export const DoneIcon = (props: React.SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeWidth={2}
      d="m9 10 3.258 2.444a1 1 0 0 0 1.353-.142L20 5"
    />
    <path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M21 12a9 9 0 1 1-6.67-8.693"
    />
  </svg>
)
