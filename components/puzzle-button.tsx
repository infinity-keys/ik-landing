import Link from "next/link";

export default function PuzzleButton() {
  return (
    <div className="play flex items-c">
      <Link href="/puzzles">
        <a className="inline-block bg-turquoise hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-xl font-medium text-white hover:text-blue">
          Puzzles
        </a>
      </Link>
    </div>
  );
}
