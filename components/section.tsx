import clsx from "clsx";

interface SectionProps {}

export default function Section({ children, ...rest }: SectionProps) {
  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-36"
      {...rest}
    >
      {children}
    </section>
  );
}
