import { FC } from "react";

interface VideoProps {
  src: string;
  title?: string;
}

const Video: FC<VideoProps> = ({ src, title }) => (
  <iframe
    className="w-full aspect-video"
    src={src}
    title={title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
);

export default Video;
