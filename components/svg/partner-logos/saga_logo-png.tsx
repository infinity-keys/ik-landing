import Image from "next/image";
import saga_logo from "../../svg/partner-logos/saga_logo.png";
const SagaLogo = () => {
  return (
    <div className="bg-white/75 p-4">
      <Image src={saga_logo} alt="Saga Logo" width="700px" height="700px" />
    </div>
  );
};
export default SagaLogo;
