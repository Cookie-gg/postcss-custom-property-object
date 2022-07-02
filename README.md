# postcss-custom-property-object

PostCSS plugin that makes it easier to define custom properties.

## Install

```bash
npm i -D postcss @cookie_gg/postcss-custom-property-object
# or
yarn add -D postcss @cookie_gg/postcss-custom-property-object
```

## Usage

```js:postcss.config.js
module.exports = {
  ...
  plugins: [
    ['postcss-custom-property-object', {
        breakpoints: ['1200px', '768px'],
      }
    ]
  ]
  ...
}
```

```css:style.css
/* before */
:root {
  --font: (16px, {sm: 12px | 10px | 8px, md: 24px, lg: 32px, xl: 48px});
}
/* after */
:root {
  --font: 16px;
  @media screen and (min-width: 1200px) {
    --font: 12px;
  }
  @media screen and (min-width: 769px) and (max-width: 1199px) {
    --font: 10px;
  }
  @media screen and (max-width: 768px) {
    --font: 8px;
  }
  --font-md: 24px;
  --font-lg: 32px;
  --font-xl: 48px;
}
```

## Options

**breakpoints: `Array<String>`**

> default: `['480px', '768px', '1024px', '1200px']`

Provide a custom set of breakpoints

**token: `String`**

> default: '\*'

Define the skip token used to ignore portions of the shorthand.
