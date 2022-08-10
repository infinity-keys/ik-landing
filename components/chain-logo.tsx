import AvalancheLogo from "@components/svg/logo-avalanche";
import EthereumLogo from "@components/svg/logo-ethereum";
import PolygonLogo from "@components/svg/logo-polygon";

interface ChainLogoProps {
  name: "Ethereum" | "Avalanche" | "Polygon";
  height?: number;
  width?: number;
}

export default function ChainLogo({
  name,
  height = 20,
  width = 20,
}: ChainLogoProps) {
  const props = {
    height,
    width,
  };

  switch (name) {
    case "Ethereum":
      return <EthereumLogo {...props} />;
    case "Avalanche":
      return <AvalancheLogo {...props} />;
    case "Polygon":
      return <PolygonLogo {...props} />;
  }
}
