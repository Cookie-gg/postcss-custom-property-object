import postcss from 'postcss';
import type * as PostCSS from 'postcss';

import { REGEXP } from './libs/regexp';
import { converter } from './libs/converter';

type Plugin = (decl: PostCSS.Declaration, token?: string, breakpoints?: string[]) => void;
type MakeResponsive = (prop: string, values: string[], ...args: Required<Parameters<Plugin>>) => void;
type Options = { token?: string; breakpoints?: string[] };

const SPLIT_REGEXP = REGEXP.SPLIT('|');

const makeResponsive: MakeResponsive = (prop, values, decl, token, breakpoints) => {
  const bps = breakpoints.map((bp) => converter.unit(bp));
  values.forEach((value, i) => {
    if (value === token) return;
    if (i === 0) {
      const newDecl = postcss.decl({ prop, value: converter.rgb(value) });
      decl.after(newDecl);
      return;
    } else {
      const mediaQuery = postcss.atRule({
        name: 'media',
        params: `${bps[i] ? `(min-width: ${bps[i].value + 1}${bps[i].unit}) and ` : ''}(max-width: ${
          breakpoints[i - 1]
        })`,
      });
      const newDecl = postcss.decl({ prop, value });
      const newRule = postcss.rule({ selector: ':root' });
      newRule.append(newDecl);
      mediaQuery.append(newRule);
      if (decl.parent) decl.parent.after(mediaQuery);
    }
  });
};

const plugin: Plugin = (decl, token, breakpoints) => {
  const propSet = decl.value.match(REGEXP.OBJECT);
  if (propSet && decl.prop.match(REGEXP.CUSTOM_PROPERTY)) {
    const [, normal, object] = propSet;
    const valueObject = postcss.list.comma(object).map((_) => postcss.list.split(_, [':'], false));
    valueObject.map(([key, value]) => {
      const prop = converter.prop(decl.prop, key);
      if (token && breakpoints && value.match(SPLIT_REGEXP)) {
        makeResponsive(prop, value.split(SPLIT_REGEXP), decl, token, breakpoints);
      } else {
        const newDecl = postcss.decl({ prop, value: converter.rgb(value) });
        decl.after(newDecl);
      }
    });
    if (normal !== '') {
      decl.value = converter.rgb(postcss.list.comma(normal)[0]);
    } else decl.remove();
  }
};

module.exports = (opts: Options = {}): PostCSS.Plugin => {
  const { token, breakpoints } = opts;
  return {
    postcssPlugin: 'postcss-custom-property-object',
    Rule: (rule) => {
      rule.each((child) => child.type === 'decl' && plugin(child, token, breakpoints));
    },
  };
};

module.exports.postcss = true;
