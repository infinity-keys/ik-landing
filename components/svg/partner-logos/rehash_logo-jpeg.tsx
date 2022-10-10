import Image from "next/image";
import rehash_logo from "../../svg/partner-logos/rehash_logo.jpeg";
const RehashLogo = () => {
  return (
    <Image src={rehash_logo} alt="Saga Logo" width="700px" height="700px" />
  );
};
export default RehashLogo;
