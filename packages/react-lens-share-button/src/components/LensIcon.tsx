import React from 'react'

import clsx from 'clsx'

import { icon } from './style.css'
import { LensIconProps } from './types'

export const LensIcon = ({
  height = 18,
  width = 18,
  className,
}: LensIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(
      icon,
      'react-lens-share-button__svg',
      className && className
    )}
  >
    <mask
      id="a"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={width}
      height={height}
      fill="#000"
    >
      <path fill="currentColor" d="M0 0h16v16H0z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.73 10.01a8.97 8.97 0 0 1-5.82-2.76 2.57 2.57 0 0 1-.72-1.97c.04-.63.33-1.24.8-1.72a2.64 2.64 0 0 1 1.66-.81 2.4 2.4 0 0 1 1.79.62c.05-.7.34-1.3.82-1.73A2.62 2.62 0 0 1 8.01 1c.66 0 1.28.23 1.74.64.49.43.78 1.03.83 1.73a2.38 2.38 0 0 1 1.78-.62 2.77 2.77 0 0 1 2.47 2.53c.05.72-.2 1.4-.72 1.97l-.16.16a8.97 8.97 0 0 1-5.7 2.6v.13c.03 1.17.53 2.03 1.4 2.44.89.41 2 .26 2.82-.34l.3.43c-.59.44-1.3.67-2.03.67a3.1 3.1 0 0 1-1.24-.25 4.59 4.59 0 0 0 5.26.9l.23.49a5.1 5.1 0 0 1-6.28-1.5 4.83 4.83 0 0 1-.46-.74v2.74h-.52v-2.75A5.13 5.13 0 0 1 1 14.47l.22-.47a4.6 4.6 0 0 0 5.26-.9 3.46 3.46 0 0 1-3.27-.42l.3-.44c.82.6 1.94.75 2.82.34.88-.4 1.37-1.27 1.4-2.45v-.12ZM2.35 3.94c.38-.39.91-.66 1.48-.66.46 0 .94.17 1.38.6a7.36 7.36 0 0 1 .26.27l.5.53-.03-.73v-.38a2 2 0 0 1 2.07-2.04 2 2 0 0 1 2.06 2.04v.21a2.96 2.96 0 0 1 0 .17l-.02.73.5-.53a5.34 5.34 0 0 1 .26-.27c.99-.96 2.18-.64 2.86.06.68.7 1 1.92.06 2.94l-.15.15A8.58 8.58 0 0 1 8.01 9.5a8.55 8.55 0 0 1-5.72-2.61c-.94-1.02-.63-2.23.06-2.94Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.73 10.01a8.97 8.97 0 0 1-5.82-2.76 2.57 2.57 0 0 1-.72-1.97c.04-.63.33-1.24.8-1.72a2.64 2.64 0 0 1 1.66-.81 2.4 2.4 0 0 1 1.79.62c.05-.7.34-1.3.82-1.73A2.62 2.62 0 0 1 8.01 1c.66 0 1.28.23 1.74.64.49.43.78 1.03.83 1.73a2.38 2.38 0 0 1 1.78-.62 2.77 2.77 0 0 1 2.47 2.53c.05.72-.2 1.4-.72 1.97l-.16.16a8.97 8.97 0 0 1-5.7 2.6v.13c.03 1.17.53 2.03 1.4 2.44.89.41 2 .26 2.82-.34l.3.43c-.59.44-1.3.67-2.03.67a3.1 3.1 0 0 1-1.24-.25 4.59 4.59 0 0 0 5.26.9l.23.49a5.1 5.1 0 0 1-6.28-1.5 4.83 4.83 0 0 1-.46-.74v2.74h-.52v-2.75A5.13 5.13 0 0 1 1 14.47l.22-.47a4.6 4.6 0 0 0 5.26-.9 3.46 3.46 0 0 1-3.27-.42l.3-.44c.82.6 1.94.75 2.82.34.88-.4 1.37-1.27 1.4-2.45v-.12ZM2.35 3.94c.38-.39.91-.66 1.48-.66.46 0 .94.17 1.38.6a7.36 7.36 0 0 1 .26.27l.5.53-.03-.73v-.38a2 2 0 0 1 2.07-2.04 2 2 0 0 1 2.06 2.04v.21a2.96 2.96 0 0 1 0 .17l-.02.73.5-.53a5.34 5.34 0 0 1 .26-.27c.99-.96 2.18-.64 2.86.06.68.7 1 1.92.06 2.94l-.15.15A8.58 8.58 0 0 1 8.01 9.5a8.55 8.55 0 0 1-5.72-2.61c-.94-1.02-.63-2.23.06-2.94Z"
      fill="currentColor"
    />
    <path
      d="M7.73 10.01h.4v-.37l-.37-.03-.03.4Zm-5.66-2.6.28-.28-.28.28Zm-.16-.17.3-.27-.3.28Zm-.72-1.96-.4-.03.4.03Zm.8-1.72.28.28-.29-.28Zm1.66-.81-.03-.4.03.4Zm1.79.62-.27.3.6.53.06-.8-.4-.03Zm.82-1.73.27.3-.27-.3Zm3.5 0 .26-.3-.27.3Zm.82 1.73-.4.04.07.79.6-.52-.27-.3Zm1.78-.62-.03.4.03-.4Zm1.68.81-.29.28.29-.28Zm.79 1.72-.4.03.4-.03Zm-.72 1.97.3.27-.3-.27Zm-.16.16-.28-.28.28.28Zm-5.7 2.6-.02-.4-.38.03v.38h.4Zm0 .13h-.4.4Zm1.4 2.44.17-.36-.17.36Zm2.82-.34.33-.23-.23-.33-.33.24.23.32Zm.3.43.24.33.32-.23-.23-.32-.32.22Zm-2.03.67v-.4.4ZM9.5 13.1l.16-.36-.44.65.28-.29Zm2.24 1.25.09-.4-.1.4Zm3.02-.34.37-.17-.17-.37-.37.18.17.36Zm.23.48.17.36.35-.17-.16-.36-.36.17Zm-2.22.5v-.4.4Zm-1.15-.12.1-.4-.1.4Zm-2.91-1.88-.32.24.32-.24Zm0 0-.33.23.32-.23Zm-.46-.74.36-.18-.76.18h.4Zm0 2.74v.4h.4v-.4h-.4Zm-.52 0h-.4v.4h.4v-.4Zm0-2.75h.4l-.75-.17.35.17Zm-.45.74.32.25-.32-.25Zm0 0 .32.25-.32-.24Zm-2.92 1.88-.09-.39.1.4Zm-1.14.13v-.4.4ZM1 14.48l-.36-.17-.17.36.36.17.17-.36Zm.22-.48.17-.36-.36-.18-.17.37.36.17Zm3.03.34-.09-.4.09.4Zm2.23-1.25.28.29-.44-.65.16.36Zm-1.23.25v-.4.4Zm-2.04-.67-.33-.23-.22.33.31.23.24-.33Zm.3-.43.24-.32-.33-.25-.24.34.33.23Zm2.82.34-.16-.36.16.36Zm1.4-2.45.4.01h-.4ZM2.35 3.94l-.29-.28.29.28Zm2.86-.06-.28.29.28-.29Zm.15.15.29-.28-.3.28Zm.11.12-.3.27.3-.27Zm.5.53-.3.28.72.78-.03-1.07-.4.01Zm-.03-.73.4-.01v-.02l-.4.03Zm0-.28h-.4.4Zm0-.1-.4-.02v.02h.4Zm4.13 0h-.4v.01l.4-.01Zm0 .3h.4-.4Zm0 .08.4.01v-.01h-.4Zm-.02.73h-.4l-.02 1.06.72-.78-.3-.28Zm.5-.53.3.27-.3-.27Zm.1-.12.3.28-.3-.28Zm.16-.15.28.29-.28-.29Zm2.92 3-.3-.27.3.27Zm-.15.15-.28-.27.28.27Zm-11.15 0-.28.28.28-.28Zm-.14-.15.3-.27-.3.27Zm5.47 2.73a8.57 8.57 0 0 1-5.4-2.48l-.58.56a9.37 9.37 0 0 0 5.93 2.72l.05-.8Zm-5.4-2.48-.16-.16-.58.55.16.17.57-.56Zm-.16-.16a2.17 2.17 0 0 1-.61-1.66l-.8-.06c-.06.84.23 1.62.83 2.27l.58-.55Zm-.6-1.66c.04-.53.27-1.05.68-1.47l-.58-.55a3.18 3.18 0 0 0-.9 1.96l.8.06Zm.68-1.47c.4-.41.9-.65 1.41-.7l-.06-.79c-.72.06-1.4.4-1.93.94l.58.55Zm1.41-.7a2 2 0 0 1 1.5.54l.52-.6a2.8 2.8 0 0 0-2.08-.73l.06.8Zm2.15.27c.05-.62.3-1.12.7-1.47L6 1.34c-.57.5-.9 1.2-.96 2l.8.07Zm.7-1.47c.39-.35.91-.54 1.48-.54V.6C7.26.6 6.54.86 6 1.34l.53.6Zm1.48-.54c.57 0 1.09.2 1.48.54l.53-.6A3.02 3.02 0 0 0 8 .6v.8Zm1.48.54c.4.35.64.85.7 1.47l.8-.07c-.07-.8-.4-1.5-.97-2l-.53.6Zm1.35 1.74c.46-.4.97-.57 1.5-.53l.06-.8c-.76-.06-1.48.2-2.08.72l.52.6Zm1.5-.53c.5.04 1 .28 1.41.7l.57-.56a3.05 3.05 0 0 0-1.92-.94l-.07.8Zm1.41.7c.4.4.64.93.68 1.46l.8-.06a3.17 3.17 0 0 0-.9-1.96l-.58.55Zm.68 1.46c.05.6-.16 1.17-.62 1.66l.6.55c.59-.65.88-1.43.82-2.27l-.8.06Zm-.62 1.66-.14.16.57.56.16-.17-.59-.55Zm-.15.16a8.57 8.57 0 0 1-5.43 2.49l.05.8c.86-.06 3.7-.41 5.96-2.73l-.58-.56Zm-5 3v-.11h-.8v.12h.8Zm1.16 2.09c-.7-.33-1.14-1.03-1.17-2.1l-.8.03c.04 1.28.59 2.3 1.63 2.8l.34-.73Zm2.42-.3c-.71.52-1.68.64-2.42.3l-.34.72c1.03.48 2.3.3 3.23-.38l-.47-.64Zm.86.53-.3-.44-.65.46.3.43.65-.45Zm-2.36 1.3c.81 0 1.6-.27 2.27-.75l-.47-.65c-.53.39-1.16.6-1.8.6v.8Zm-1.4-.29c.45.19.92.28 1.4.28v-.8a2.7 2.7 0 0 1-1.08-.21l-.31.73Zm2.49.49a4.19 4.19 0 0 1-2.04-1.14l-.57.57a5 5 0 0 0 2.43 1.35l.18-.78Zm2.76-.31a4.2 4.2 0 0 1-2.76.3l-.18.79a5 5 0 0 0 3.29-.37l-.35-.72Zm.76.67-.22-.48-.73.33.22.49.73-.34Zm-2.58 1.08a5.5 5.5 0 0 0 2.39-.55l-.35-.72a4.7 4.7 0 0 1-2.04.47v.8Zm-1.24-.15c.4.1.82.15 1.24.15v-.8c-.36 0-.71-.04-1.06-.12l-.18.77ZM8.4 13.22a5.53 5.53 0 0 0 3.14 2.03l.18-.78a4.73 4.73 0 0 1-2.69-1.73l-.63.48Zm0 0 .64-.48-.65.48Zm-.5-.8c.14.28.3.54.5.8l.63-.48c-.15-.21-.3-.44-.4-.68l-.73.36Zm.76 2.56v-2.74h-.8v2.74h.8Zm-.92.4h.52v-.8h-.52v.8Zm-.4-3.15v2.75h.8v-2.75h-.8Zm.27.98c.19-.25.35-.52.5-.8l-.72-.35c-.12.24-.26.46-.42.68l.64.47Zm0 .01-.64-.49.64.5Zm-3.15 2.02c1.25-.28 2.36-1 3.15-2.02l-.64-.49a4.73 4.73 0 0 1-2.69 1.73l.18.78Zm-1.23.14c.41 0 .83-.04 1.23-.14l-.18-.78c-.34.08-.7.13-1.05.13v.8Zm-2.4-.54a5.5 5.5 0 0 0 2.4.54v-.8c-.7 0-1.4-.15-2.05-.46l-.34.72Zm.04-1.01-.22.48.72.33.22-.48-.72-.33Zm3.3.12c-.93.21-1.9.1-2.77-.31l-.34.72a5 5 0 0 0 3.29.36l-.18-.77ZM6.2 12.8c-.57.57-1.27.96-2.04 1.14l.18.78c.91-.21 1.75-.68 2.42-1.35l-.56-.57Zm-.95.93c.47 0 .95-.1 1.39-.28l-.32-.73c-.34.14-.7.21-1.07.21v.8ZM2.97 13c.67.48 1.46.74 2.28.74v-.8c-.65 0-1.28-.2-1.8-.59l-.48.65Zm.21-.99-.3.43.66.46.3-.43-.66-.46Zm2.99.2c-.75.35-1.71.23-2.42-.3l-.48.65c.92.69 2.2.86 3.23.38l-.33-.72Zm1.16-2.09c-.02 1.07-.46 1.77-1.16 2.1l.33.72c1.05-.48 1.6-1.51 1.63-2.8l-.8-.02Zm0-.1v.11h.8v-.12h-.8Zm-3.5-7.14c-.7 0-1.33.33-1.77.78l.57.56c.32-.33.76-.54 1.2-.54v-.8Zm1.66.71a2.34 2.34 0 0 0-1.66-.71v.8c.35 0 .73.13 1.1.49l.56-.58Zm.16.16-.16-.16-.56.58.14.14.58-.56Zm.12.13a7.16 7.16 0 0 0-.12-.13l-.58.56.1.11.6-.54Zm.49.53-.5-.53-.58.54.49.54.59-.55Zm-.71-.45.01.74.8-.03-.02-.73-.8.02Zm0-.18v.19l.8-.05v-.14h-.8Zm0-.11v.11h.8v-.1l-.8-.01Zm0-.1v.1l.8.01v-.11h-.8ZM8 1.13a2.42 2.42 0 0 0-2.46 2.42l.8.03c.01-.6.24-1 .54-1.25.3-.27.72-.4 1.12-.4v-.8Zm2.46 2.43a2.42 2.42 0 0 0-.82-1.84A2.54 2.54 0 0 0 8 1.13v.8c.4 0 .81.13 1.12.4.3.26.53.66.54 1.25l.8-.02Zm0 .22v-.23l-.8.03v.2h.8Zm0 0h-.8.8Zm0 .1v-.1h-.8v.07l.8.03Zm0 .07v-.07l-.8-.03v.1h.8Zm-.02.75.02-.74-.8-.02-.02.73.8.03Zm-.2-.82-.49.53.59.55.5-.54-.6-.54Zm.12-.13-.12.13.6.54.1-.11-.58-.56Zm.16-.16-.16.16.58.56.14-.14-.56-.58Zm3.43.07c-.4-.4-.95-.71-1.57-.77a2.32 2.32 0 0 0-1.86.7l.56.58c.41-.4.84-.52 1.23-.49.4.04.78.25 1.06.54l.58-.56Zm.06 3.5c.55-.6.74-1.27.69-1.9a2.66 2.66 0 0 0-.75-1.6l-.58.56c.29.3.5.7.53 1.1.04.41-.08.86-.47 1.29l.58.54Zm-.15.15.15-.16-.58-.54-.14.15.57.55ZM8.01 9.9c.06 0 3.38-.03 5.86-2.58l-.57-.55a7.82 7.82 0 0 1-3.5 2.02c-1.05.3-1.81.3-1.8.3v.8ZM2.15 7.31A8.95 8.95 0 0 0 8 9.9v-.8s-.76 0-1.8-.3a7.82 7.82 0 0 1-3.49-2.03l-.57.55Zm-.16-.16.16.16.57-.55-.14-.15-.59.54Zm.07-3.49c-.4.41-.7.98-.75 1.6-.05.63.14 1.3.68 1.9l.6-.55c-.4-.43-.52-.87-.48-1.28.04-.42.24-.82.52-1.1l-.57-.57Z"
      fill="currentColor"
      mask="url(#a)"
    />
  </svg>
)
