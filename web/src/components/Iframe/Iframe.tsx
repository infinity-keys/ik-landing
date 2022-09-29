import clsx from 'clsx'

// anything with an aspect ratio will be parsed as an iframe
interface IframeProps {
  src: string
  title?: string
  sandbox?: string
  aspect: string
}

export default function Iframe({ src, title, sandbox, aspect }: IframeProps) {
  const classes = clsx('container block w-full max-w-2xl')

  return (
    <span className={classes} style={{ aspectRatio: aspect }}>
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
  )
}
