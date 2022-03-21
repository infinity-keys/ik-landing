import Link from "next/link";

const NavFront = () => (
  <div className="flex space-x-4 py-16">
    <Link href="/about">
      <a className="text-gray-300 hover:text-gray-150 py-3 text-sm font-medium">
        About
      </a>
    </Link>
    <Link href="/about/team">
      <a className="text-gray-300 hover:text-gray-150 py-3 text-sm font-medium">
        Team
      </a>
    </Link>
    <Link href="/about/mission">
      <a className="text-gray-300 hover:text-gray-150 py-3 text-sm font-medium">
        Mission
      </a>
    </Link>
    <Link href="/products">
      <a className="text-gray-300 hover:text-gray-150 py-3 text-sm font-medium">
        Products
      </a>
    </Link>
    <Link href="/tech">
      <a className="text-gray-300 hover:text-gray-150 py-3 text-sm font-medium">
        Tech
      </a>
    </Link>
    <Link href="/partners">
      <a className="text-gray-300 hover:text-gray-150 py-3 text-sm font-medium">
        Partners
      </a>
    </Link>
  </div>
);

export default NavFront;
