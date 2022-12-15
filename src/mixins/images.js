const iiifBase = (sigil, page, numbered) => [
  'http://130.92.252.118:1026/rapp/',
  `${sigil.toLowerCase()}${page}${numbered ? '_num' : ''}.j2k`
].join('')

export default {
  methods: {
    iiif (sigil, page, numbered = false) {
      return `${iiifBase(sigil, page, numbered)}/info.json`
    },

    thumb (sigil, page, numbered = false) {
      return `${iiifBase(sigil, page, numbered)}/full/300,/0/default.jpg`
    },

    figure (sigil, page, numbered = false) {
      return `${iiifBase(sigil, page, numbered)}/full/800,/0/default.jpg`
    }

  }
}
