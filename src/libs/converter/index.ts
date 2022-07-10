export const converter = {
  rgb: (str: string): string => {
    if (str.match(/^rgba\(/)) return str;
    else return str.replace(/^rgb\(/, '').replace(/\)$/, '');
  },
  prop: (prop: string, key: string): string => {
    return `${prop}${key.includes('\\') ? '' : '-'}${key}`;
  },
};
