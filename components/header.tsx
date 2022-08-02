import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { useSelector } from "@xstate/react";

import { GlobalWalletContext, createSelector } from "@ik-xstate/global-wallet";

import BeakerIcon from "@heroicons/react/outline/BeakerIcon";
import MenuIcon from "@heroicons/react/outline/MenuIcon";
import XIcon from "@heroicons/react/outline/XIcon";

import Button from "@components/button";

export const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Hunts",
    href: "/puzzles",
  },
  { name: "Collab", href: "/#collab" },
  {
    name: "Thesis",
    href: "https://blog.infinitykeys.io/what-is-infinity-keys",
  },
  { name: "Blog", href: "https://blog.infinitykeys.io" },
];

const isConnectingSelector = createSelector((state) =>
  state.matches("connecting")
);
const isConnectedSelector = createSelector((state) =>
  state.matches("connected")
);

export default function Header() {
  const globalWalletService = useContext(GlobalWalletContext);
  const isConnecting = useSelector(globalWalletService, isConnectingSelector);
  const isConnected = useSelector(globalWalletService, isConnectedSelector);
  const { send } = globalWalletService;

  return (
    <Disclosure as="header" className="header w-full sticky top-0 z-50 bg-blue">
      {({ open }) => (
        <>
          <div
            className="px-4 sm:px-6 lg:px-8 border-b border-indigo-500 lg:border-none"
            aria-label="Top"
          >
            <div className="relative flex items-center justify-between h-20">
              <div
                data-cy="ik logo"
                className="logo flex-shrink-0 flex items-center"
              >
                <div className="block sm:hidden h-12 w-auto">
                  <Link href="/">
                    <a>
                      <Image
                        src="/logo-mobile.svg"
                        width={19.7}
                        height={48}
                        alt="IK logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block h-12 w-auto">
                  <Link href={"/"}>
                    <a>
                      <Image
                        src="/logo.svg"
                        width={100}
                        height={55}
                        alt="IK logo"
                      />
                    </a>
                  </Link>
                </div>
              </div>

              <div className="menu-items items-center justify-center sm:items-stretch sm:justify-start hidden lg:flex">
                <nav className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a className="header-nav--link text-2xl font-medium text-white hover:text-turquoise">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>

              <div
                data-cy="puzzle-link"
                className="grid grid-flow-col gap-1 sm:gap-4"
              >
                <Button
                  text="Starter Pack"
                  href="/pack/starter-pack"
                  variant="outline"
                  responsive
                />

                <Button text="Puzzles" href="/puzzles" responsive />

                <button
                  onClick={() =>
                    isConnected
                      ? send("DISCONNECT_WALLET")
                      : send("CONNECT_WALLET")
                  }
                  className="flex p-2 justify-center items-center text-white hover:text-turquoise"
                >
                  <BeakerIcon className="block h-6 w-6" aria-hidden="true" />
                  {isConnecting && "connecting..."}
                  {isConnected && "connected"}
                </button>
              </div>

              {/* hamburger icon, visible mobile only */}
              <div className="hamburger flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-white block px-3 py-2 rounded-md text-2xl font-medium"
                  aria-current={item.name ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
