const iiifBase = (sigil, page, numbered) => [
  'https://iiif.ub.unibe.ch/image/v3.0/parzival/',
  //'https://parzival.unibe.ch/sipi/rapp/', // works for info json; exchange with proper iiif-url
  // if there is a proper iiif-server around
  `${sigil.toLowerCase()}${page}${numbered ? '_num' : ''}.j2k`
].join('')

export default {
  methods: {

    thumb (sigil, page, numbered = false) {
      return `${iiifBase(sigil, page, numbered)}/full/50,/0/default.jpg`
    },

    // for getting the json data containing the iiif-id's for each image name
    async fetchImagesData() {
      // PUT THE JSON INTO var/www/parzival/rapp/
      const jsonFilePath = '/rapp/images.json';
      try {
        const response = await fetch(jsonFilePath);
        if (!response.ok) throw new Error('Failed to fetch');
        return await response.json();
      } catch (error) {
        console.error('Error fetching images data:', error);
        throw error; // Rethrow to handle it in the calling context
      }
    },

    imageGuuidFromFileName(imagesData, fileName) {
      const image = imagesData.find(image => image.ImageSourceFileName === fileName);
      return image ? image.imageGuuid : null;
    }

  }
}
