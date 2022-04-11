import type { FC, PropsWithChildren } from "react";

const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="bg-blue text-gray-100">{children}</div>
);

export default Wrapper;
