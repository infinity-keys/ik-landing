import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ShieldExclamationIcon from "@heroicons/react/24/outline/ShieldExclamationIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";

import useCurrentWidth from "@hooks/useCurrentWidth";
import Button from "@components/button";

const MAGIC_WIDTH = 400;

export default function WalletButton() {
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const width = useCurrentWidth();

  useEffect(() => {
    if (width < MAGIC_WIDTH) {
      setIsSmall(true);
    } else {
      setIsSmall(false);
    }
  }, [width, setIsSmall]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: "opacity-0 pointer-events-none select-none",
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    text={isSmall ? "Connect" : "Connect Wallet"}
                    onClick={openConnectModal}
                    type="button"
                  />
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    text={isSmall ? "" : "Wrong Network"}
                    onClick={openChainModal}
                    type="button"
                    variant={isSmall ? "faded" : "solid"}
                  >
                    {isSmall && (
                      <ShieldExclamationIcon className="h-8 w-8 fill-transparent stroke-red-600" />
                    )}
                  </Button>
                );
              }
              return (
                <div className="flex gap-3">
                  <Button
                    onClick={openChainModal}
                    type="button"
                    variant="faded"
                    text={chain.name || "Unknown"}
                  >
                    {chain.hasIcon && (
                      <div className="mr-4">
                        {chain.iconUrl && (
                          <Image
                            width={24}
                            height={24}
                            alt={`${chain.name} icon` ?? "Chain icon"}
                            src={chain.iconUrl}
                            objectFit="cover"
                          />
                        )}
                      </div>
                    )}
                  </Button>
                  <Button
                    text={isSmall ? "" : account.displayName}
                    onClick={openAccountModal}
                    type="button"
                    variant="faded"
                  >
                    {isSmall && (
                      <WalletIcon className="h-8 w-8 fill-transparent" />
                    )}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
