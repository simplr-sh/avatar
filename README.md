# @simplr-sh/avatar

A TypeScript library for generating beautiful gradient-based avatars with customizable text overlays.

## Installation

```bash
# Using bun
bun i @simplr-sh/avatar
```
```bash
# Using NPM
npm i @simplr-sh/avatar
```
```bash
# Using Yarn
yarn add @simplr-sh/avatar
```

## Features

- Generate gradient-based avatars
- Customizable size and border radius
- Text overlay support
- Full TypeScript support
- Returns Base64 SVG data URI

## API Reference

### getAvatar(options)

Generate an avatar with a gradient background and text overlay.

Options:
- `name` (string): Name used to generate the gradient
- `text` (string): Text to display on the avatar
- `size` (number, optional): Size of the avatar in pixels (default: 128)
- `rounded` (number, optional): Border radius of the avatar (default: 0)

Returns a Promise that resolves to a Base64 SVG data URI.

## Usage

### Vanilla JavaScript
```typescript
import { getAvatar } from '@simplr-sh/avatar';

// Generate a simple avatar
const avatar = await getAvatar({
  name: 'John Doe',
  text: 'JD',
  size: 128,
  rounded: 16,
});

// Use in HTML
const img = document.createElement('img');
img.src = avatar;
document.body.appendChild(img);
```

### React
```tsx
import { useEffect, useState } from 'react';
import { getAvatar } from '@simplr-sh/avatar';

function Avatar({ name, text, size = 128, rounded = 16 }) {
  const [avatarSrc, setAvatarSrc] = useState<string>('');

  useEffect(() => {
    getAvatar({ name, text, size, rounded })
      .then(setAvatarSrc)
      .catch(console.error);
  }, [name, text, size, rounded]);

  return <img src={avatarSrc} alt={`Avatar for ${name}`} />;
}

// Usage
function App() {
  return <Avatar name="John Doe" text="JD" />;
}
```

## Attribution

This package is inspired by and contains code adapted from [Vercel's Avatar](https://github.com/vercel/avatar) repository. We're grateful to Vercel for their original work on avatar generation.

## Development

```bash
bun install
bun run index.ts
```

This project was created using `bun init` in bun v1.1.42.
