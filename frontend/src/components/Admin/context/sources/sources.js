import React, {createContext, useContext, useEffect, useState} from "react"

import sourcesService from "../../../../services/sources"

const SourcesContext = createContext({})

const Sources = (props) => {

    const [sources, setSources] = useState(useContext(SourcesContext))

    const updateSources = () => {
        sourcesService.get()
            .then(sources => setSources(sources))
    }

    useEffect(() => {
        const timerHandler = setInterval(updateSources, 1000)
        updateSources()
        return () => clearTimeout(timerHandler)
    }, [])

    return (
        <SourcesContext.Provider value={sources}>
            {props.children}
        </SourcesContext.Provider>
    )

}

export {Sources as default, SourcesContext}
