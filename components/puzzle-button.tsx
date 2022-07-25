import Link from "next/link";
import clsx from "clsx";

interface PuzzleButtonProps {
  text: string;
  href?: string;
  textColor?: "dark" | "light";
}

export default function PuzzleButton({
  text,
  href,
  textColor = "dark",
}: PuzzleButtonProps) {
  const classes = clsx(
    "play inline-block bg-turquoise hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-xl font-medium hover:text-blue",
    { "text-white": textColor === "dark" }
  );

  if (href) {
    return (
      <Link href={href}>
        <a className={classes}>{text}</a>
      </Link>
    );
  }

  return <button className={classes}>{text}</button>;
}
