const fetch = require('node-fetch')

const beatportSearchUrl = 'https://www.beatport.com/_next/data/6dFTaaSXmiS3bdOu9Dsk6/en/search.json'

const searchService = {

    search: (terms) => {
        const url = new URL(beatportSearchUrl)
        url.searchParams.append('q', terms)
        return fetch(url.href)
            .then(response => {
                if (response.status !== 200) {
                    return Promise.reject()
                }
                return response.json()
            })
            .then(result => {
                return result.pageProps.dehydratedState.queries[0].state.data.tracks.data.map(data => ({
                    artists: data.artists.map(artist => artist.artist_name),
                    title: data.track_name,
                    mix: data.mix_name,
                    cover: data.release.release_image_uri
                }))
            })
            .catch(error => {[]})
    }

}

module.exports = searchService
