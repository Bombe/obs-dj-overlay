const fetch = require('node-fetch')
const {JSDOM} = require('jsdom')

let currentSentryId = 'unknown'
const beatportSearchUrl = 'https://www.beatport.com/_next/data/{sentryId}/en/search.json'

const getBeatportSearchUrl = terms => {
    const url = new URL(beatportSearchUrl.replace('{sentryId}', currentSentryId))
    url.searchParams.append('q', terms)
    return url
}

const updateCurrentSentryIdFromHtmlPage = htmlText => {
    const htmlPage = new JSDOM(htmlText)
    const nextData = JSON.parse(htmlPage.window.document.querySelector(`[id='__NEXT_DATA__']`).textContent)
    currentSentryId = nextData.buildId
}

const searchService = {

    search: (terms) => {
        const url = getBeatportSearchUrl(terms)
        return fetch(url.href)
            .then(response => {
                if (response.status == 404) {
                    return response.text()
                        .then(updateCurrentSentryIdFromHtmlPage)
                        .then(() => fetch(getBeatportSearchUrl(terms).href))
                }
                return response
            })
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
