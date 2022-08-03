import { FC } from "react";

interface IframeProps {
  src: string;
  title?: string;
}

const Iframe: FC<IframeProps> = ({ src, title }) => (
  <span className="container block max-w-xl videoAspect">
    <iframe
      height="100%"
      width="100%"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      allowFullScreen
    />
  </span>
);

export default Iframe;
