import debounce from 'lodash.debounce'
import OpenSeadragon from 'openseadragon'

const viewportKey = 'parzival.facsimileViewport'
const defaultViewport = { x: 0, y: 0, width: 1, height: 0.5 }
const storeViewport = (viewport) => {
  sessionStorage[viewportKey] = JSON.stringify(viewport)
  return viewport
}
const storedViewport = () => {
  try {
    return JSON.parse(sessionStorage[viewportKey] || JSON.stringify(defaultViewport))
  } catch (e) {
    return defaultViewport
  }
}
export default {
  name: 'facsimile-viewer',
  props: ['manuscript', 'pages', 'numbered'],

  data () {
    return { viewport: storedViewport() }
  },

  methods: {
    openPages () {
      if (!this.osd) {
        return
      }
      this.imageOpen = false
      this.osd.close()

      const { manuscript, pageList, numbered } = this
      let { length } = pageList
      const width = 1 / length

      const success = () => {
        if (--length === 0) {
          let { x, y, width, height } = this.viewport
          x = Math.round((1 - (width || 1)) * 50) / 100
          y = 0

          this.imageOpen = true
          this.osd.viewport.fitBounds(
            new OpenSeadragon.Rect(x, y, width, height, 0),
            true
          )
          this.updateViewport()
        }
      }

      const fetchRetry = (url, options = {}, retries) =>
        fetch(url, options)
          .then(res => {
            if (res.ok) {
              return res.json()
            }
            if (retries > 0) {
              return fetchRetry(url, options, retries - 1)
            }
            throw new Error(res.status)
          })
          .catch(error => {
            console.error(error.message);
          })

      pageList.forEach((page, pi) => {
        if (page !== undefined) {
          // get the url for the image info
          const url = this.iiif(manuscript, page, numbered);
          // Start of hackish solution to bypass opening ports for sipi. In a working environment/iiif-server
          // remove the following fetch then's and pass above url directly to addTiledImage()
          // fetch the json
          fetchRetry(url, {mode: 'no-cors'}, 2).then(response => {
            return response
          }).then(data => {
            // replace hackish the domains
            data = JSON.stringify(data)
              .replaceAll('http://localhost:1026', 'https://www.parzival.unibe.ch/sipi');
            // build a new JSON as Blob and make it available by a url in the DOM
            const newJson = new Blob([data], {type: "application/json"})
            return URL.createObjectURL(newJson);
          }).then( url => {
              // pass the url to openseadragons TileImage
              this.osd.addTiledImage({
                tileSource: url,
                width,
                x: (pi * width),
                success
              });
          });
        }
      })
    },

    withOpenImage (fn) {
      const { osd, imageOpen } = this
      return osd ? fn(osd, imageOpen) : false
    },

    updateViewport () {
      this.withOpenImage(({ viewport }, imageOpen) => {
        if (!imageOpen) return

        viewport = viewport.getConstrainedBounds()

        const [x, y, width, height] = ['x', 'y', 'width', 'height']
          .map(k => (Math.round(viewport[k] * 100) / 100))

        this.viewport = { x, y, width, height }
      })
    },

    zoomIn () {
      this.withOpenImage(({ viewport }) => viewport.zoomBy(2))
    },

    zoomOut () {
      this.withOpenImage(({ viewport }) => viewport.zoomBy(0.5))
    },

    rotate (degrees) {
      this.withOpenImage(({ viewport }) => viewport.setRotation(
        viewport.getRotation() + degrees
      ))
    },

    rotateLeft () {
      this.rotate(-90)
    },

    rotateRight () {
      this.rotate(90)
    }

  },

  watch: {
    manuscript () {
      this.openPages()
    },

    pages () {
      this.openPages()
    },

    viewport () {
      storeViewport(this.viewport)
    }
  },

  created () {
    this.imageOpen = false
  },

  mounted () {
    const element = this.$el.querySelector('.parzival-facsimile')
    const osd = this.osd = OpenSeadragon({
      element,
      showNavigator: true,
      showNavigationControl: false,
      showRotationControl: false,
      navigatorPosition: 'TOP_LEFT',
      debugMode: false
    })

    osd.addHandler('viewport-change', debounce(
      this.updateViewport.bind(this), 50, { leading: true }
    ))

    this.openPages()
  },

  beforeDestroy () {
    if (this.osd) {
      this.osd.destroy()
    }
  }
}
