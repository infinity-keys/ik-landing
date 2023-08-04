import clsx from 'clsx'

const LockedIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    className={clsx(className, 'fill-transparent')}
  >
    <path
      fill="#1C1917"
      stroke="#FAFAF9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M29.858 21.74A15 15 0 1 0 2.14 10.26a15 15 0 0 0 27.718 11.48Z"
    />
    <path
      stroke="#FAFAF9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 17.333v1.556M11.5 22h9c.398 0 .78-.164 1.06-.456.282-.291.44-.687.44-1.1v-4.666c0-.413-.158-.808-.44-1.1a1.474 1.474 0 0 0-1.06-.456h-9c-.398 0-.78.164-1.06.456-.282.292-.44.687-.44 1.1v4.666c0 .413.158.809.44 1.1.28.292.662.456 1.06.456Zm7.5-7.778v-3.11a3.17 3.17 0 0 0-.879-2.2A2.947 2.947 0 0 0 16 8c-.796 0-1.559.328-2.121.911a3.17 3.17 0 0 0-.879 2.2v3.111h6Z"
    />
  </svg>
)
export default LockedIcon
