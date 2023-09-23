import React, {createContext, useContext} from 'react'

import defaultSourcesService from '../../services/sources'

const SourcesServiceContext = createContext(defaultSourcesService)

const WithSourcesService = props => {

    const sourcesServiceFromContext = useContext(SourcesServiceContext)
    const givenSourcesService = props.sourcesService

    return (<SourcesServiceContext.Provider value={givenSourcesService || sourcesServiceFromContext}>
        {props.children}
    </SourcesServiceContext.Provider>)
}

export {SourcesServiceContext, WithSourcesService}
