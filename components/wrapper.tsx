import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import Header from "@components/header";
import Footer from "@components/footer";

type WrapperProps = {
  full?: boolean;
  radialBg?: boolean;
  customClasses?: string[];
};

const Wrapper: FC<PropsWithChildren<WrapperProps>> = ({
  children,
  full = false,
  radialBg = true,
  customClasses = [],
}) => (
  <div
    className={clsx(customClasses, "bg-blue text-gray-100 relative z-0", {
      "radial-bg": radialBg,
    })}
  >
    <Header />
    <div
      className={clsx(
        "min-h-[calc(100vh-80px)] flex flex-col items-center justify-center",
        {
          "container px-4": !full,
        }
      )}
    >
      {children}
    </div>
    <Footer />
  </div>
);

export default Wrapper;
