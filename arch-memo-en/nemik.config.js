

export default async function (nemik) {
  nemik
    .warn(`Processing…`)
    .gdoc('gdoc-rb', '1T0X3x8XI-xbXKmRkWUEq7_NY0XPD2yexKWzpPJ4jRfA', { save: 'eurosky-design-sovereignty-en.json' })
    .gdoc2html()
    // .bibliography()
    .theme('eurosky', {
      // cover: 'rhea.jpg',
      // date: true,
      // author: 'Robin Berjon',
      // appendices: ['Acknowledgements'],
    })
    .lang('en')
    .pdf('eurosky-design-sovereignty-en.pdf')
    .saveHTML({ to: 'eurosky-design-sovereignty-en.html', pretty: true })
  ;
}
