import Link from "next/link";

interface PuzzleButtonProps {
  text?: string;
}

export default function PuzzleButton({ text = "Puzzles" }: PuzzleButtonProps) {
  return (
    <Link href="/puzzles">
      <a className="play inline-block bg-turquoise hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-xl font-medium text-white hover:text-blue">
        {text}
      </a>
    </Link>
  );
}
