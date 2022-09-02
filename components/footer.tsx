import TwitterIcon from "./svg/twitter-icon-svg";
import Discord from "./svg/discord-svg";
import Link from "next/link";
import Button from "./button";
import { PACK_COLLECTION_BASE } from "@lib/constants";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Collab", href: "#collab" },
  { name: "Thesis", href: "#" },
];

export default function Footer() {
  return (
    <footer className="ik-footer text-white">
      <div className="py-12 px-4 overflow-hidden sm:px-6 lg:px-8 bg-blue">
        <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex flex-col sm:flex-row items-center justify-center border-b border-indigo-500 lg:border-none">
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
            <div className="mb-4 sm:mb-0 sm:ml-6 flex gap-4">
              <Button
                text="Packs"
                href={`/${PACK_COLLECTION_BASE}`}
                variant="outline"
              />
              <Button text="Puzzles" href="/puzzles" variant="outline" />
            </div>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-500">
          &copy; 2022 Infinity Keys. All rights reserved. |{" "}
          <Link href="/privacy-policy">
            <a className="transition hover:text-turquoise">Privacy Policy</a>
          </Link>
        </p>
      </div>
    </footer>
  );
}
