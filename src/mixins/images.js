const iiifBase = (sigil, page, numbered) => [
  'https://www.parzival.unibe.ch/sipi/rapp/', // works for info json; exchange with proper iiif-url
  // if there is a proper iiif-server around
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
