import clsx from "clsx";
import { HTMLProps } from "react";

interface SectionProps extends HTMLProps<HTMLElement> {
  largePadding?: boolean;
  mediumPadding?: boolean;
}

export default function Section({
  largePadding = true,
  mediumPadding = true,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={clsx("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", {
        "md:py-28": mediumPadding,
        "lg:py-40": largePadding,
      })}
      {...rest}
    >
      {children}
    </section>
  );
}
