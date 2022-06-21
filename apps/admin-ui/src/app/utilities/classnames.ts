const classnames = (...classnames: (string | boolean)[]) =>
  classnames.filter(Boolean).join(' ');

export default classnames;
