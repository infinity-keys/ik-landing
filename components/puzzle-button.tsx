import Link from "next/link";

interface PuzzleButtonProps {
  text?: string;
  href?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

export default function PuzzleButton({
  text,
  href,
  backgroundColor,
  hoverBackgroundColor,
  textColor,
  borderColor,
  hoverBorderColor,
}: PuzzleButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <a className="play inline-block bg-turquoise hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-xl font-medium text-white hover:text-blue">
          {text}
        </a>
      </Link>
    );
  }

  return <button>{text}</button>;
}
