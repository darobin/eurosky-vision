
// bottom-left, top-right
const bgOptions = {
  white: ['#fff', '#fff'],
  tang: ['#d7371d', '#eb8558'],
};
const fgOptions = {
  black: '#000',
  tang: '#c00004',
};
const accentOptions = {
  black: '#000',
  tang: '#c00004',
};
const offOptions = {
  inup: [-12, 5],
  none: [0, 0],
  outup: [12, -6],
};
const defaultOptions = { bg: 'white', fg: 'black', accent: 'black', off: 'inup' };

const [form, bgCol, fgCol, accentCol, offCol] = ['controls', 'bg', 'fg', 'accent', 'off'].map(id => document.getElementById(id));
makeCol('bg', bgOptions, bgCol);
makeCol('fg', fgOptions, fgCol);
makeCol('accent', accentOptions, accentCol);
makeCol('off', offOptions, offCol);

function makeCol (name, options, col) {
  el('h6', {}, [name], col);
  Object.keys(options).forEach(k => {
    el('label', {}, [el('input', { type: 'radio', name, value: k }), ` ${k}`], col);
  });
}

const known = new Set(['bg', 'fg', 'accent', 'off']);
function fromHash () {
  const options = { ...defaultOptions };
  (window.location.hash || '')
    .replace(/^#/, '')
    .split('&')
    .forEach(pair => {
      const [k, v] = pair.split('=');
      if (!known.has(k)) return;
      options[k] = v;
    })
  ;
  console.warn(options);
  const [gmax, gmin] = bgOptions[options.bg];
  const fg = fgOptions[options.fg];
  const accent = accentOptions[options.accent];
  const [xoff, yoff] = offOptions[options.off];
  const bs = document.body.style;
  bs.setProperty('--gmax',    gmax);
  bs.setProperty('--gmin',    gmin);
  bs.setProperty('--fg',      fg);
  bs.setProperty('--accent',  accent);
  bs.setProperty('--xoff',    `${xoff}px`);
  bs.setProperty('--yoff',    `${yoff}px`);
  Object.entries(options).forEach(([k, v]) => {
    const rad = form.querySelector(`input[name="${k}"][value="${v}"]`);
    if (!rad) return;
    rad.checked = true;
  });
}
window.onload = fromHash;
window.onhashchange = fromHash;

form.onchange = () => {
  const values = {
    bg: form.querySelector(`input[name="bg"]:checked`).value || defaultOptions.bg,
    fg: form.querySelector(`input[name="fg"]:checked`).value || defaultOptions.fg,
    accent: form.querySelector(`input[name="accent"]:checked`).value || defaultOptions.accent,
    off: form.querySelector(`input[name="off"]:checked`).value || defaultOptions.off,
  };
  window.location.hash = `#${Object.entries(values).map(([k, v]) => `${k}=${v}`).join('&')}`;
}

function el (n, attrs, kids, p) {
  const e = document.createElement(n);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v == null) return;
    e.setAttribute(k, v);
  });
  (kids || []).forEach(appendByType(e));
  if (p) p.append(e);
  return e;
}
function appendByType (parent) {
  return (n) => {
    if (typeof n === 'string') parent.append(txt(n));
    else parent.append(n);
  }
}
function txt (str) {
  return document.createTextNode(str);
}
