import Image from "next/image";
import pn_symbol_clean from "../../svg/partner-logos/pn_symbol_clean.png";
const PnLogo = () => {
  return (
    <Image src={pn_symbol_clean} alt="Saga Logo" width="700px" height="700px" />
  );
};
export default PnLogo;
