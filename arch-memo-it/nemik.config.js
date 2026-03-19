

export default async function (nemik) {
  nemik
    .warn(`Processing…`)
    .gdoc('gdoc-rb', '1cNezSO07vnTxJGbMzo2iqtokr_D2gt4OENjFIV3VqU8', { save: 'eurosky-design-sovereignty-it.json' })
    .gdoc2html()
    // .bibliography()
    .theme('eurosky', {
      // cover: 'rhea.jpg',
      // date: true,
      // author: 'Robin Berjon',
      // appendices: ['Acknowledgements'],
    })
    .lang('it')
    .pdf('eurosky-design-sovereignty-it.pdf')
    .saveHTML({ to: 'eurosky-design-sovereignty-it.html', pretty: true })
  ;
}
