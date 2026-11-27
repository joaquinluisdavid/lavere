import type { CSSProperties } from 'react'
import { imageManifest, type ImageName } from '../../data/imageManifest'

type PictureProps = {
  name: ImageName
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  style?: CSSProperties
}

const base = import.meta.env.BASE_URL

export function imageSrc(name: ImageName, width: number) {
  return `${base}images/${name}-${width}.webp`
}

export function Picture({ name, alt, sizes = '100vw', priority = false, className, style }: PictureProps) {
  const meta = imageManifest[name]
  const srcSet = meta.widths.map((w) => `${imageSrc(name, w)} ${w}w`).join(', ')

  return (
    <img
      src={imageSrc(name, 1080)}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={{ backgroundColor: meta.color, ...style }}
    />
  )
}
