import {createContext, useCallback, useState} from 'react'

const cleanMixName = mixName => {
    if (mixName.toLowerCase() === 'original mix') {
        return undefined
    }
    if (mixName.toLowerCase() === 'extended mix') {
        return undefined
    }
    return mixName
}

const cleanTitle = title => {
    const trackParts = title.split(/\)? \(|\)$/)
    return trackParts.at(0) + trackParts.slice(1).map(cleanMixName).filter(n => n !== undefined).filter(n => n !== '').map(s => ` (${s})`).join()
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

    const setTitle = useCallback((givenTitle, mixName) => {
        let title = givenTitle
        if (mixName !== undefined) {
            title += ` (${mixName})`
        }
        setTitleState(cleanTitle(title))
    }, [setTitleState])

    const setCover = useCallback(cover => {
        setCoverState(cover)
    }, [setCoverState])

    return <TrackContext.Provider value={props.track || {artist: artistState, title: titleState, cover: coverState, setArtist, setTitle, setCover}}>{props.children}</TrackContext.Provider>
}

export {TrackContext, WithTrack}
