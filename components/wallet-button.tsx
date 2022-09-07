import useCurrentWidth from "@hooks/useCurrentWidth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

import Button from "./button";
import WalletIcon from "./svg/wallet-icon-svg";

export default function WalletButton() {
  const width = useCurrentWidth();
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
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    text={width < 450 ? "Connect" : "Connect Wallet"}
                    onClick={openConnectModal}
                    type="button"
                  />
                );
              }
              if (chain.unsupported) {
                return width < 400 ? (
                  <button
                    className="flex items-center bg-white/20 font-medium rounded-md text-lg border border-white/0 hover:border-turquoise"
                    onClick={openChainModal}
                    type="button"
                  >
                    <WalletIcon />
                  </button>
                ) : (
                  <Button
                    text={"Wrong Network"}
                    onClick={openChainModal}
                    type="button"
                    responsive={true}
                  />
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    className="flex items-center bg-white/20 p-2 font-medium rounded-md text-lg border border-white/0 hover:border-turquoise"
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            width={24}
                            height={24}
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            objectFit="cover"
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden sm:inline">{chain.name}</span>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex items-center bg-white/20 p-2 font-medium rounded-md text-lg border border-white/0 hover:border-turquoise"
                    type="button"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
