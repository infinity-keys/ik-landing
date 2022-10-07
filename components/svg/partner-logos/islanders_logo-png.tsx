import Image from "next/image";
import islanders_logo from "../../svg/partner-logos/finkel_logo.png";
const IslandersLogo = () => {
  return (
    <Image src={islanders_logo} alt="Saga Logo" width="700px" height="700px" />
  );
};
export default IslandersLogo;
