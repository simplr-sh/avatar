import { generateGradient } from './gradient'

/**
 * Generate an avatar with a gradient background and text
 * @param name - Name of the user
 * @param text - Text to display on the avatar
 * @param size - Size of the avatar
 * @param rounded - Border radius of the avatar
 *
 * @example
 * getAvatar({
 *   name: 'John Doe',
 *   text: 'JD',
 *   size: 128,
 *   rounded: 16,
 * })
 * .then(console.log)
 * .catch(console.error)
 *
 * @returns {Promise<string>} Base64 SVG data URI
 */
export async function getAvatar({
  name,
  text,
  size = 128,
  rounded = 0,
}: {
  name: string
  text: string
  size?: number
  rounded?: number
}) {
  const gradient = await generateGradient(name).catch((error) => {
    console.error('Error generating gradient:', error)
    // Return a default gradient or throw the error
    return { fromColor: '#808080', toColor: '#C0C0C0' }
  })

  const svg = `<svg width="${size}" height="${size}" viewbox="0 0 ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name} avatar"><g><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${
    gradient.fromColor
  }" /><stop offset="100%" stop-color="${
    gradient.toColor
  }" /></linearGradient></defs><rect fill="url(#gradient)" x="0" y="0" width="${size}" height="${size}" rx="${rounded}" ry="${rounded}"/>${
    text && getText({ text, size })
  }</g></svg>`

  const base64SvgDataUri = `data:image/svg+xml;base64,${
    typeof Buffer !== 'undefined'
      ? Buffer.from(svg).toString('base64')
      : btoa(svg)
  }`
  return base64SvgDataUri
}

function getText({ text, size }: { text: string; size: number }) {
  const fontSize = Math.max((size * 0.9) / text.length, size / 4)

  return `<text x="50%" y="50%" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" fill="#fff" font-family="inherit" font-size="${fontSize}">${text}</text>`
}
