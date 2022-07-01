export const REGEXP = {
  CUSTOM_PROPERTY: /^\-{2}/,
  OBJECT: /\(([\w,\s\(\)]*)\{(\S*[\s+:\S+\s+,*\S+]*)\}\)/,
  SPLIT: (syntax: string, flags?: string) => new RegExp(`\\s*\\${syntax}\\s*`, flags),
};
