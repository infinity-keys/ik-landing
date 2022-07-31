import TwitterIcon from "./svg/twitter-icon-svg";
import Discord from "./svg/discord-svg";
import Link from "next/link";
import Button from "./button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Hunts", href: "#" },
  { name: "Collab", href: "#collab" },
  { name: "Thesis", href: "#" },
];

export default function Footer() {
  return (
    <footer className="">
      <div className="py-12 px-4 overflow-hidden sm:px-6 lg:px-8 bg-blue">
        <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex flex-col sm:flex-row items-center justify-center border-b border-indigo-500 lg:border-none">
            {/* <div className="logo flex-shrink-0 flex items-center">
              <div className="block lg:hidden h-12 w-auto">
                <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
              </div>
              <div className="hidden lg:block h-12 w-auto">
                <Image src="/logo.svg" width={100} height={55} alt="IK logo" />
              </div>
            </div> */}
            {/* left */}
            {/* <div className="menu-items flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {navigation.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-2xl font-medium hover:text-turquoise"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div> */}
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="twitterIcon hover: fill-twitterBlue">
                <a
                  data-cy="twitter"
                  href="https://twitter.com/InfinityKeys"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon />
                </a>
              </div>
              <div className="discordIcon hover: fill-discordPurple">
                <a
                  data-cy="discord"
                  href="https://discord.com/invite/infinitykeys"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Discord />
                </a>
              </div>
            </div>
            {/* right */}
            <Link href="/pack/starter-pack">
              <a className="sm:ml-6 hover:bg-turquoise py-2 px-4 border-2 border-turquoise hover:border-white rounded-md text-xl font-medium text-white hover:text-blue box-border mb-4 sm:mb-0">
                Starter Pack
              </a>
            </Link>

            <div className="sm:pl-6">
              <Button text="Puzzles" href="/puzzles" />
            </div>
            {/* <div className="ml-10 space-x-4">
              <a
                href="#"
                className="inline-block bg-turquoise hover:bg-turquoise py-2 px-4 border border-turquoise hover:border-white rounded-md text-2xl font-medium text-white hover:text-blue"
              >
                Puzzles
              </a>
            </div> */}
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-500">
          &copy; 2022 Infinity Keys. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
