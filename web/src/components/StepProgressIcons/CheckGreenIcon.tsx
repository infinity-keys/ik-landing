import clsx from 'clsx'

const CheckGreenIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    className={clsx(
      className,
      'filters fill-transparent drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]'
    )}
  >
    <path
      fill="#0E7B0C"
      d="M29.858 21.74A15 15 0 1 0 2.14 10.26a15 15 0 0 0 27.718 11.48Z"
    />
    <path
      stroke="#FAFAF9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m11 16 3.333 3.333L21 12.667M31 16A15 15 0 1 1 .998 16 15 15 0 0 1 31 16Z"
    />
  </svg>
)
export default CheckGreenIcon
