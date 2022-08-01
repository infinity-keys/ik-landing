import { FC } from "react";

interface VideoProps {
  src: string;
  title?: string;
}

const Video: FC<VideoProps> = ({ src, title }) => (
  <span className="container block max-w-xl videoAspect">
    <iframe
      height="100%"
      width="100%"
      src={src}
      title={title}
      frameBorder="0"
      sandbox="allow-scripts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; camera; microphone; xr-spatial-tracking; scrolling; fullscreen"
      allowFullScreen
    />
  </span>
);

export default Video;
