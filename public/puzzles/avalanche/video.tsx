import { FC } from "react";

interface VideoProps {
  src: string;
  title?: string;
}

const Video: FC<VideoProps> = ({ src, title }) => (
  <span className="flex w-full justify-center">
    <span className="block">
      <iframe
        className="w-full aspect-video"
        height={409}
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </span>
  </span>
);

export default Video;
