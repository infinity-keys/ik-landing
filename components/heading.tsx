import { HTMLProps } from "react";
import clsx from "clsx";

interface HeadingProps extends HTMLProps<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  center?: boolean;
  small?: boolean;
  turquoise?: boolean;
}

export default function Heading({
  as = "h2",
  center,
  small,
  turquoise,
  children,
  ...rest
}: HeadingProps) {
  const classes = clsx(
    "text-4xl tracking-tight font-extrabold",
    turquoise ? "text-turquoise" : "text-white",
    {
      "text-center": center,
      "sm:text-6xl": !small,
      "text-turquoise": turquoise,
    }
  );

  switch (as) {
    case "h1":
      return (
        <h1 className={classes} {...rest}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={classes} {...rest}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={classes} {...rest}>
          {children}
        </h3>
      );
  }
}
