import Image from "next/image";
import sagalogo from "../../svg/partner-logos/sagalogo.png";
const SagaLogo = () => {
  return <Image src={sagalogo} alt="Saga Logo" width="500px" height="500px" />;
};
export default SagaLogo;
