export const REGEXP = {
  CUSTOM_PROPERTY: /^\-{2}/,
  COLOR_CODE: /^rgb\(|^#|^hsl\(/,
  OBJECT: /\(([\w,\s\(\)]*)\{(\S*[\s+:\S+\s+,*\S+]*)\}\)/,
};
