

// bottom-left, top-right
const bgOptions = {
  white: ['#fff', '#fff'],
  tang: ['#d7371d', '#eb8558'],
  neon: ['#7bf125', '#d1ee2b'],
  club: ['#0e1014', '#41536f'],
  sunset: ['#ddb7b4', '#5388ac'],
};
const fgOptions = {
  black: '#000',
  tang: '#c00004',
  neon: '#d1ee2b',
  gold: '#e7fece',
  cream: '#E6E4D2',
};
const accentOptions = {
  black: '#000',
  tang: '#c00004',
  neon: '#d1ee2b',
  gold: '#e7fece',
  cream: '#E6E4D2',
};
const offOptions = {
  inup: [-12, 5],
  none: [0, 0],
  outup: [12, -6],
};
const z = 16;
const gradOptions = {
  diag: 'linear-gradient(to top right, var(--gmax, #fff), var(--gmin, #fff))',
  zap: `linear-gradient(60deg, var(--gmax, #fff), var(--gmin, #fff) calc(50% - ${z + 1}rem), var(--gmax, #fff) calc(50% - ${z}rem), var(--gmin, #fff) calc(50% + ${z}rem), var(--gmax, #fff) calc(50% + ${z + 1}rem), var(--gmin, #fff))`,
  tight: `linear-gradient(45deg, var(--gmax, #fff), var(--gmax, #fff) calc(50% - ${z}rem), var(--gmin, #fff) calc(50% + ${z}rem), var(--gmin, #fff)`,
};
const defaultOptions = { bg: 'tang', fg: 'black', accent: 'neon', off: 'inup', grad: 'diag' };

const [form, bgCol, fgCol, accentCol, offCol, gradCol] = ['controls', 'bg', 'fg', 'accent', 'off', 'grad'].map(id => document.getElementById(id));
makeCol('bg', bgOptions, bgCol);
makeCol('fg', fgOptions, fgCol);
makeCol('accent', accentOptions, accentCol);
makeCol('off', offOptions, offCol);
makeCol('grad', gradOptions, gradCol);

function makeCol (name, options, col) {
  el('h6', {}, [name], col);
  Object.keys(options).forEach(k => {
    el('label', {}, [el('input', { type: 'radio', name, value: k }), ` ${k}`], col);
  });
}

const known = new Set(['bg', 'fg', 'accent', 'off', 'grad']);
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
  const grad = gradOptions[options.grad];
  const bs = document.body.style;
  bs.setProperty('--gmax',    gmax);
  bs.setProperty('--gmin',    gmin);
  bs.setProperty('--fg',      fg);
  bs.setProperty('--accent',  accent);
  bs.setProperty('--xoff',    `${xoff}px`);
  bs.setProperty('--yoff',    `${yoff}px`);
  bs.setProperty('--grad',    grad);
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
    grad: form.querySelector(`input[name="grad"]:checked`).value || defaultOptions.grad,
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
