import type { FC, PropsWithChildren } from "react";
import Header from "@components/header";
import Footer from "@components/footer";

const Wrapper: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className="bg-blue text-gray-100">
    <Header />
    {children}
    <Footer />
  </div>
);

export default Wrapper;
