import clsx from "clsx";
import { ReactNode } from "react";

interface FlickerProps {
  delay?: string;
  once?: boolean;
  children: ReactNode;
}

const Flicker = ({ delay = "0s", once = false, children }: FlickerProps) => (
  <span
    style={{ animationDelay: delay }}
    className={clsx(
      "font-medium text-turquoise",
      once ? "animate-fade" : "animate-flicker"
    )}
  >
    {children}
  </span>
);

export default Flicker;
