import {createContext, useCallback, useState} from 'react'

const cleanMixName = mixName => {
    const words = mixName.split(/ +/)
        .filter(word => !/^extended$/i.test(word))
        .filter(word => !/^original$/i.test(word))
    if ((words.length === 1) && /^((re)?mix|version)$/i.test(words[0])) {
        return '';
    }
    return words.join(' ')
}

const removeFeaturing = title =>
    title.split(/(^| )feat\./)[0]

const cleanTitle = title => {
    const trackParts = title.split(/[\])]? [[(]|[\])]$/)
    return removeFeaturing(trackParts.at(0)) + trackParts.slice(1).map(removeFeaturing).map(cleanMixName).filter(n => n !== undefined).filter(n => n !== '').map(s => ` (${s})`).join('')
}

const TrackContext = createContext(undefined)

const WithTrack = props => {

    const [artistState, setArtistState] = useState('')
    const [titleState, setTitleState] = useState('')
    const [coverState, setCoverState] = useState('')

    const setArtist = useCallback(givenArtist => {
        if (Array.isArray(givenArtist)) {
            setArtistState(givenArtist.join(', '))
        } else {
            setArtistState(givenArtist)
        }
    }, [setArtistState])

    const cleanQuotes = string => string.replaceAll('\'', '’').replaceAll('"', '”')

    const cleanArtist = useCallback(() => {
        const splitArtists = artistState.split(',').map(artist => artist.trim()).map(cleanQuotes)
        splitArtists.sort((a, b) => a.localeCompare(b))
        setArtistState(splitArtists.join(', '))
    }, [artistState, setArtistState])

    const setTitle = useCallback((title, cleanTitleFlag = true) => {
        setTitleState(cleanTitleFlag ? cleanTitle(title) : title)
    }, [setTitleState])

    const cleanTitleExternal = useCallback(() => {
        const cleanedTitle = cleanQuotes(titleState)
        setTitleState(cleanedTitle)
    }, [titleState, setTitleState])

    const setCover = useCallback(cover => {
        setCoverState(cover)
    }, [setCoverState])

    return <TrackContext.Provider value={props.track || {artist: artistState, title: titleState, cover: coverState, setArtist, setTitle, setCover, cleanArtist, cleanTitle: cleanTitleExternal}}>{props.children}</TrackContext.Provider>
}

export {TrackContext, WithTrack}
