import type { FC } from "react";

const Wrapper: FC = ({ children }) => (
  <div className="bg-blue text-gray-100">{children}</div>
);

export default Wrapper;
