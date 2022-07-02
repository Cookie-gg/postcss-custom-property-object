declare module 'css-color-converter' {
  interface Methods {
    toRgbString(): string;
    toHslString(): string;
    toHexString(): string;
    toRgbaArray(): [string, string, string, string];
  }
  function fromString(str: string): Methods;
  function fromRgb([r, g, b]: [r: string, g: string, b: string]): Methods;
  function fromRgba([r, g, b, a]: [r: string, g: string, b: string, a: string]): Methods;
  function fromHsl([h, s, l]: [h: string, s: string, l: string]): Methods;
  function fromHsla([h, s, l, a]: [h: string, s: string, l: string, a: string]): Methods;
}
