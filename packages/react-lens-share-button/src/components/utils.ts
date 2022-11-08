import { BuildLensShareUrlProps } from './types'

export const buildLensShareUrl = ({
  postBody,
  via,
  url,
  hashtags,
  preview,
}: BuildLensShareUrlProps) => {
  const href = new URL(`https://lenster.xyz/?`)

  href.searchParams.set('text', postBody)
  via && href.searchParams.set('via', via)
  url && href.searchParams.set('url', url)
  hashtags && href.searchParams.set('hashtags', hashtags)
  preview && href.searchParams.set('preview', 'true')

  return href.toString()
}
