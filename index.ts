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
  const gradient = await generateGradient(name)

  const svg = `<svg width="${size}" height="${size}" viewbox="0 0 ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg"><g><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${
    gradient.fromColor
  }" /><stop offset="100%" stop-color="${
    gradient.toColor
  }" /></linearGradient></defs><rect fill="url(#gradient)" x="0" y="0" width="${size}" height="${size}" rx="${rounded}" ry="${rounded}"/>${
    text && getText({ text, size })
  }</g></svg>`

  const base64SvgDataUri = `data:image/svg+xml;base64,${
    !Buffer ? btoa(svg) : Buffer.from(svg).toString('base64')
  }`
  return base64SvgDataUri
}

function getText({ text, size }: { text: string; size: number }) {
  return `<text x="50%" y="50%" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" fill="#fff" font-family="inherit" font-size="${
    (size * 0.9) / text.length
  }">${text}</text>`
}
