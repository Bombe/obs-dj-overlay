import React, {createContext, useCallback, useContext, useEffect, useState} from "react"

import {SourcesServiceContext} from '../sourcesService'

const SourcesContext = createContext({loaded: false})

const WithSources = (props) => {

    const sourcesService = useContext(SourcesServiceContext)

    const [sources, setSources] = useState(useContext(SourcesContext))

    const updateSources = useCallback(() => {
        sourcesService.get()
            .then(sources => setSources({...sources, loaded: true}))
    }, [sourcesService])

    useEffect(() => {
        if (props.sources) {
            return
        }
        const timerHandler = setInterval(updateSources, 1000)
        updateSources()
        return () => clearTimeout(timerHandler)
    }, [props.sources, updateSources])

    return (
        <SourcesContext.Provider value={props.sources || sources}>
            {props.children}
        </SourcesContext.Provider>
    )

}

export {SourcesContext, WithSources}
