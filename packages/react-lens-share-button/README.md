# 🌿 react-lens-share-button

A customizable, React button component for sharing to [Lens](https://www.lens.xyz/). It creates a url that opens a new post preview window in Lenster.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
  - [LensShareButton Component Props](#lenssharebutton-component-props)
  - [LensIcon Component Props](#lensicon-component-props)
  - [buildLensShareUrl Function Props](#buildlensshareurl-function-props)
- [Styling](#styling)
- [Report Issues](#report-issues)

## Installation

```shell
yarn add @infinity-keys/react-lens-share-button react react-dom
```
or use npm:

```shell
npm install @infinity-keys/react-lens-share-button react react-dom
```

## Usage

Import the component and default styles:

```js
import { LenShareButton } from "@infinity-keys/react-lens-share-button"
import '@infinity-keys/react-lens-share-button/dist/style.css'
```

And use it like this:

```js
<LensShareButton postBody="Hello, Lens!" />
```

If you need to build the url without using the component, you can import the `buildLensShareUrl` function directly:

```js
import { buildLensShareUrl } from "@infinity-keys/react-lens-share-button"

const url = buildLensShareUrl({ postBody: 'Hello, Lens!' })

console.log(url) // https://lenster.xyz/?text=Hello%2C+Lens%21
```

The Lens svg icon can also be imported directly:

```js
import { LensIcon } from "@infinity-keys/react-lens-share-button"
```

## Props

Using these props...
```js
<LensShareButton
  postBody="Hello, Lens!"
  url="https://lens.xyz"
  via="lensprotocol"
  hashtags="react,js"
  preview={true}
/>
```

...will open this post editor window in Lenster.

![](https://res.cloudinary.com/infinity-keys/image/upload/v1668207717/npm/lens-button-ex-1_hmfwux.png)

### LensShareButton Component Props

| Prop                 | Type    | Required | Default Value | Description                                                                                                                            |
|----------------------|---------|----------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| postBody             | string  | yes      |               | The main body of the post.                                                                                                                  |
| url                  | string  | no       |               | A link that will be appended below the post body and hashtags.                                                                                      |
| via                  | string  | no       |               | A Lenster user who will be tagged.                                                                                                     |
| hashtags             | string  | no       |               | Hashtags that will be appended directly after the post body. To use multiple hashtags, pass a comma separated values, e.g. "react,js". |
| preview              | boolean | no       | true          | Determines whether the post window opens in "preview" or "edit" mode.                                                                  |
| buttonLabel          | string  | no       | "Share"       | The button's text.                                                                                                                     |
| icon                 | boolean | no       | true          | Whether the Lens icon should show in the button.                                                                                       |
| iconSize             | number  | no       | 18            | The size of the Lens icon.
| light                | boolean | no       | false         | If enabled, the button's background will be light green and the text will be dark green.                                               |
| iconWrapperClassName | string  | no       |               | Will add classes to the span wrapping the Lens icon.                                                                                  |
| iconClassName        | string  | no       |               | Will add classes to the Lens icon svg.                                                                                                |
| className            | string  | no       |               | Will add classes to the parent anchor tag.                                                                                                        |

### LensIcon Component Props

| Prop         | Type    | Required | Default Value | Description                                     |
|--------------|---------|----------|---------------|-------------------------------------------------|
| height       | number  | no       | 18            | Height of svg.                                  |
| width        | number  | no       | 18            | Width of svg.                                   |
| className    | string  | no       |               | Will add classes to the svg.                   |

### buildLensShareUrl Function Props

| Prop     | Type    | Required | Default Value | Description                                                                                                                            |
|----------|---------|----------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| postBody | string  | yes      |               | The main body of the post.                                                                                                                  |
| url      | string  | no       |               | A link that will be appended below the post body and hashtags.                                                                                      |
| via      | string  | no       |               | A Lenster user who will be tagged.                                                                                                     |
| hashtags | string  | no       |               | Hashtags that will be appended directly after the post body. To use multiple hashtags, pass a comma separated values, e.g. "react,js". |
| preview  | boolean | no       | true          | Determines whether the post window opens in "preview" or "edit" mode.                                                                  |

## Styling

To use the default styles, import them into your file.

```js
import '@infinity-keys/react-lens-share-button/dist/style.css'
```

Classes can be passed down to each element, and inline styles can be passed down to the parent link element like so:

```js
<LensShareButton
  postBody="Hello, Lens!"
  style={{ marginTop: 30 }}
  className="font-bold"
  iconWrapperClassName="p-2"
  iconClassName="text-orange-400"
/>
```

Each element also has a class that can be targeted via css:

```css
.ReactLensShareButton {
  background-color: purple !important;
  /* ... */
}

.ReactLensShareButton__svg-wrapper {
  /* ... */
}

.ReactLensShareButton__svg {
  /* ... */
}
```

## Report Issues

If you have any issues, please reach out on our public [Discord](https://discord.gg/infinitykeys).
