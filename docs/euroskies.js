
// bottom-left, top-right
const bgOptions = {
  white: ['#fff', '#fff'],
  tang: ['#d7371d', '#eb8558'],
};
const fgOptions = {
  black: '#000',
  tang: '#c00004',
};
const offOptions = {
  inup: [-12, 5],
  none: [0, 0],
  outup: [12, -6],
};

const [form, bgCol, fgCol, offCol] = ['controls', 'bg', 'fg', 'off'].map(id => document.getElementById(id));
makeCol('bg', bgOptions, bgCol);
makeCol('fg', fgOptions, fgCol);
makeCol('off', offOptions, offCol);


// XXX
// - on load or hashchange
//  - set radio based on url
//  - set variables on body
// - on form change, change the URL

function makeCol (name, options, col) {
  el('h6', {}, [name], col);
  Object.keys(options).forEach(k => {
    el('label', {}, [el('input', { type: 'radio', name, value: k }), ` ${k}`], col);
  });
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
