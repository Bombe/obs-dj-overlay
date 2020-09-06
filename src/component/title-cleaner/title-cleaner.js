const titleCleaner = (artist, title) => {
    return [{artist: artist || "", title: title || ""}]
        .map(splitRemixInfo)
        .map(removeOriginalMix)
        .map(removeExtendedMix)
        .map(removeRadioMix)
        .map(moveFeatToArtist)
        .map(mergeRemixInfo)
        .map(trimFields)
        .shift()
}

const trimFields = ({artist, title}) => {
    return {artist: artist.trim().replace(/  */g, " "), title: title.trim().replace(/  */g, " ")}
}

const splitRemixInfo = ({artist, title}) => {
    const lastClosingParen = title.lastIndexOf(")")
    const lastOpeningParen = title.lastIndexOf("(")
    if ((lastOpeningParen !== -1) && (lastClosingParen !== -1)) {
        const remixInfo = title.substring(lastOpeningParen + 1, lastClosingParen)
        return {artist, title: title.substring(0, lastOpeningParen).trim(), remix: remixInfo}
    }
    return {artist, title}
}

const removeOriginalMix = ({artist, title, remix}) => {
    if (/original mix/i.test(remix)) {
        return {artist, title}
    }
    return {artist, title, remix}
}

const removeExtendedMix = ({artist, title, remix}) => {
    if (/^extended mix$/im.test(remix)) {
        return {artist, title}
    }
    if (/extended/i.test(remix)) {
        remix = remix.split(" ").filter(e => !/extended/i.test(e)).join(" ")
    }
    return {artist, title, remix}
}

const removeRadioMix = ({artist, title, remix}) => {
    if (/^radio mix$/im.test(remix)) {
        return {artist, title}
    }
    if (/radio/i.test(remix)) {
        remix = remix.split(" ").filter(e => !/radio/i.test(e)).join(" ")
    }
    return {artist, title, remix}
}

const moveFeatToArtist = ({artist, title, remix}) => {
    const searchResults = /\bf(ea)?t\.? ([^)]*)/i.exec(title)
    if (searchResults) {
        const featuredArtist = searchResults[2]
        const cleanedTitle = (title.substring(0, searchResults.index) + title.substring(searchResults.index + searchResults[0].length)).replace(/( \(\)|\(\) )/g, "")
        return {artist: artist + " feat. " + featuredArtist, title: cleanedTitle, remix}
    }
    return {artist, title, remix}
}

const mergeRemixInfo = ({artist, title, remix}) => ({artist, title: title + (remix ? " (" + remix + ")" : "")})

module.exports = {titleCleaner}
