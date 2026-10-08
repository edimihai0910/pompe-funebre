// Fotografiile pregatite de scripts/prepare-images.mjs: src/images/web/<nume>-<latime>.webp

const files = import.meta.glob('../images/web/*.webp', { eager: true, import: 'default' })

const PHOTOS = {}
for (const [file, url] of Object.entries(files)) {
  const [, name, width] = file.match(/([^/]+)-(\d+)\.webp$/)
  if (!PHOTOS[name]) PHOTOS[name] = []
  PHOTOS[name].push({ url, width: Number(width) })
}
for (const sizes of Object.values(PHOTOS)) sizes.sort((a, b) => a.width - b.width)

/** Sursele unei fotografii: `src` (cea mai mare), `thumb` (cea mai mica) si `srcSet` pentru <img>. */
export function photo(name) {
  const sizes = PHOTOS[name]
  return {
    src: sizes[sizes.length - 1].url,
    thumb: sizes[0].url,
    srcSet: sizes.map((s) => `${s.url} ${s.width}w`).join(', '),
  }
}
