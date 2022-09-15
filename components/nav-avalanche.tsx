import Link from "next/link";

import TwitterSvg from "@components/svg/twitter-svg";
import AvalancheSvg from "@components/svg/avalanche-svg";
import Discord from "./svg/discord-svg";

type Props = {
  showAvalanche?: boolean;
};

const NavAvalanche = ({ showAvalanche = true }: Props) => (
  <div className="nav-avalanche pt-21">
    <div className="flex justify-center">

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
        Start looking for keys{" "}
        <Link href="https://twitter.com/InfinityKeys">
          <a
            rel="noopener noreferrer"
            target="_blank"
            className="text-turquoise"
          >
            @InfinityKeys
          </a>
        </Link>
        .
      </div>

      {showAvalanche && (
        <div className="px-9 w-96">
          <Link href="/puzzle/avalanche">
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
