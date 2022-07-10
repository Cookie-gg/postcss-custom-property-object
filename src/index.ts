import postcss from 'postcss';
import type * as PostCSS from 'postcss';

import { REGEXP } from './libs/regexp';
import { converter } from './libs/converter';
import { fromString } from 'css-color-converter';

type Plugin = (decl: PostCSS.Declaration, opts: Options) => void;
type Options = { parseColor?: boolean };

const plugin: Plugin = (decl, { parseColor }) => {
  const propSet = decl.value.match(REGEXP.OBJECT);
  if (propSet && decl.prop.match(REGEXP.CUSTOM_PROPERTY)) {
    const [, normal, object] = propSet;
    const valueObject = postcss.list.comma(object).map((_) => postcss.list.split(_, [':'], false));
    valueObject.map(([key, value]) => {
      const prop = converter.prop(decl.prop, key);
      const newDecl = postcss.decl({ prop, value: parseColor ? converter.rgb(value) : value });
      decl.after(newDecl);
    });
    if (normal !== '') {
      const value = postcss.list.comma(normal)[0];
      decl.value = parseColor ? converter.rgb(value) : value;
    } else decl.remove();
  }
  if (parseColor && decl.prop.match(REGEXP.CUSTOM_PROPERTY) && decl.value.match(REGEXP.COLOR_CODE)) {
    const convertedColor = fromString(decl.value);
    decl.value = converter.rgb(convertedColor.toRgbString());
  }
};

module.exports = (opts: Options = {}): PostCSS.Plugin => {
  return {
    postcssPlugin: 'postcss-custom-property-object',
    Declaration: (decl) => plugin(decl, opts),
  };
};

module.exports.postcss = true;
