import TwitterSvg from "@components/svg/twitter-svg";
import AvalancheSvg from "@components/svg/avalanche-svg";

const NavAvalanche = () => (
  <div className="nav-avalanche flex justify-center w-full py-28">
    <div className="px-9 w-36">
      <TwitterSvg />
    </div>
    <div className="px-9 w-96 fill-white flex">
      <AvalancheSvg />
    </div>
  </div>
);

export default NavAvalanche;
