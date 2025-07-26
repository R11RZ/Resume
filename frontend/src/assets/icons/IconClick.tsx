import type { SVGProps } from "react";
const IconClick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7 5.5 5.5M15 7l1.5-1.5m-11 11L7 15m4-10V3m-6 8H3m14.16 5.989 3.892-1.523a.5.5 0 0 0 0-.931l-9.353-3.655a.5.5 0 0 0-.647.648l3.654 9.352a.5.5 0 0 0 .931 0z"
    />
  </svg>
);
export default IconClick;
