# postcss-custom-property-object

PostCSS plugin that makes it easier to define custom properties.

## Usage

```js:postcss.config.js
module.exports = {
  ...
  plugins: [
    ['postcss-custom-property-object', {
        breakpoints: ['480px', '768px', '1200px'],
      }
    ]
  ]
  ...
}
```

```css:style.css
:root {
  --font: (16px, {sm: 12px | 10px | 8px, md: 24px, lg: 32px, xl: 48px});
}
```

## Options

**breakpoints: `Array<String>`**

> default: `['480px', '768px', '1024px', '1200px']`

Provide a custom set of breakpoints

**token: `String`**

> default: '\*'

Define the skip token used to ignore portions of the shorthand.
