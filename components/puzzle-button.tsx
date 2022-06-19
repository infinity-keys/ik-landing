import Link from "next/link";

export default function PuzzleButton() {
  return (
    <Link href="/puzzles">
      <a className="play inline-block bg-turquoise hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-xl font-medium text-white hover:text-blue">
        Puzzles
      </a>
    </Link>
  );
}
