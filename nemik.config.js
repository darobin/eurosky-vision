

export default async function (nemik) {
  nemik
    .warn(`Processing…`)
    .gdoc('gdoc-rb', '1u79M9wpetGQKQodk_HIUR9f1ImqbJa76KaEGERZAe2A', { save: 'eurosky-vision.json' })
    .gdoc2html()
    // .bibliography()
    .theme('academic', {
      // cover: 'rhea.jpg',
      date: true,
      author: 'Robin Berjon',
      // appendices: ['Acknowledgements'],
    })
    .pdf('eurosky-vision.pdf')
    .saveHTML({ to: 'eurosky-vision.html', pretty: true })
  ;
}
