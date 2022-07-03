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
    // other plugins...
    ['@cookie_gg/postcss-custom-property-object', {
        parseColor: false,
      }
    ]
  ]
  ...
}
```

```css:style.css
/* before */
:root {
  --font: (16px, {sm: 12px, md: 24px, lg: 32px, xl: 48px});
}
/* after */
:root {
  --font: 16px;
  --font: 12px;
  --font-md: 24px;
  --font-lg: 32px;
  --font-xl: 48px;
}
```

## Options

**parseColor: `boolean`**

> default: `false`

If `true`, the plugin will parse the color value on `rgb` or `hsl` functions and return a value of `rgb`.

```css:style.css
/* before */
:root {
  --blue: (rgb(0, 85, 225), {lighter: rgb(156, 236, 251), light: rgb(101, 199, 247)});
}
/* after */
:root {
  --blue: 0, 85, 225;
  --blue-lighter: 156, 236, 251;
  --blue-light: 101, 199, 247;
}
```

## Additional Usage

You can use this plugin with [postcss-short](https://github.com/csstools/postcss-short) and it makes it easier to use custom properties on calc, rgb and rgba function.

```js:postcss.config.js
module.exports = {
  ...
  plugins: [
    // other plugins...
    ['postcss-custom-property-object', {
        parseColor: true,
      }
    ],
    [
      'postcss-functions',
      {
        functions: {
          vrgb: (color) => `rgb(var(${color}))`,
          vrgba: (color, opacity) => {
            if (!opacity) return `rgba(var(${color}), 1)`;
            return `rgba(var(${color}), ${opacity})`;
          },
          vcalc: (formula) =>
            `calc(${formula
              .split(/(\-{2}[^(\+|\*|\/|\s)]+)/g)
              .map((r, i) => (i % 2 === 1 ? `var(${r})` : r))
              .join('')})`,
        },
      },
    ],
  ]
  ...
}
```

then, you don't have to use `var()` anymore in calc, rgb and rgba functions.

```css:style.css
/* before */
h1 {
  color: vrgb(--red);
  background-color: vrgba(--red, 0.5);
  font-size: vcalc(--font-md * 2);
}
/* after */
h1 {
  color: rgb(var(--red));
  background-color: rgba(var(--red), 0.5);
  font-size: calc(var(--font-md) * 2);
}
```
