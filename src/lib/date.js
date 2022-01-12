const join = (t, a, s) => {
  function format(m) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);
  }
  return a.map(format).join(s);
}

export const formatDate = (date, format) => {
  return join(date, format, ' ');
}