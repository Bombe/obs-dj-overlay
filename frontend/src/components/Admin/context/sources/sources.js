import React, {createContext, useCallback, useContext, useEffect, useState} from "react"

import sourcesService from "../../../../services/sources"

const SourcesContext = createContext({loaded: false})

const Sources = (props) => {

    const [sources, setSources] = useState(useContext(SourcesContext))

    const updateSources = useCallback(() => {
        sourcesService.get()
            .then(sources => setSources({...sources, loaded: true}))
    }, [sourcesService])

    useEffect(() => {
        const timerHandler = setInterval(updateSources, 1000)
        updateSources()
        return () => clearTimeout(timerHandler)
    }, [updateSources])

    return (
        <SourcesContext.Provider value={sources}>
            {props.children}
        </SourcesContext.Provider>
    )

}

export {Sources as default, SourcesContext}
