const iiifBase = (sigil, page, numbered) => [
  'https://iiif.ub.unibe.ch/image/v2.1/parzival/',
  `${sigil.toLowerCase()}${page}${numbered ? '_num' : ''}.j2k`
].join('')

export default {
  methods: {

    thumb (sigil, page, numbered = false) {
      return `${iiifBase(sigil, page, numbered)}/full/50,/0/default.jpg`
    }
  }
}
