import Link from "next/link";

import TwitterSvg from "@components/svg/twitter-svg";
import AvalancheSvg from "@components/svg/avalanche-svg";

type Props = {
  showAvalanche?: boolean;
};

const NavAvalanche = ({ showAvalanche = true }: Props) => (
  <div className="nav-avalanche py-28">
    <div className="flex justify-center">
      <div className="flex justify-center px-9 w-96">
        <div className="w-20">
          <Link href="https://twitter.com/InfinityKeys_io">
            <a
              className="flex w-full"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterSvg />
            </a>
          </Link>
        </div>
      </div>

      {showAvalanche && (
        <div className="flex justify-center px-9 w-96 fill-white">
          <Link href="https://www.avalanchesummit.com/">
            <a
              className="flex w-full"
              rel="noopener noreferrer"
              target="_blank"
            >
              <AvalancheSvg />
            </a>
          </Link>
        </div>
      )}
    </div>
    <div className="flex justify-center mt-9">
      <div className="px-9 w-96 text-center">
        Follow Infinity Keys on Twitter.
      </div>

      {showAvalanche && (
        <div className="px-9 w-96">
          <Link href="/avalanche">
            <a className="text-turquoise">
              Watch the
              <br />
              Avalanche Summit
              <br />
              Workshop.
            </a>
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default NavAvalanche;
