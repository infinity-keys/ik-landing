import { HTMLProps } from "react";

export default function Section({ children, ...rest }: HTMLProps<HTMLElement>) {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 lg:py-40"
      {...rest}
    >
      {children}
    </section>
  );
}
