export const classnames = (...classnames: (string | boolean | undefined)[]) =>
  classnames.filter(Boolean).join(' ');
