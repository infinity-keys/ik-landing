import clsx from "clsx";

interface IframeProps {
  src: string;
  title?: string;
  sandbox?: string;
  aspect: string;
}

export default function Iframe({ src, title, sandbox, aspect }: IframeProps) {
  const classes = clsx(
    "container block w-full max-w-2xl",
    `aspect-${aspect}`
    // {
    //   "aspect-square": aspect === "square",
    // },
    // { "aspect-video": aspect === "video" },
    // { "aspect-[4/3] sm:aspect-[1.4]": aspect === "crossword" }
  );

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
