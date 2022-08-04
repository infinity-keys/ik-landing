import clsx from "clsx";

interface IframeProps {
  src: string;
  title?: string;
  sandbox?: string;
  gameAspect?: boolean;
}

export default function Iframe({
  src,
  title,
  sandbox,
  gameAspect = false,
}: IframeProps) {
  const classes = clsx("container block max-w-xl aspect-video", {
    "aspect-square": gameAspect,
  });

  return (
    <span className={classes}>
      <iframe
        height="100%"
        width="100%"
        src={src}
        title={title}
        sandbox={sandbox}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
      />
    </span>
  );
}
