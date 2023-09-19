import React, {createContext, useContext} from 'react'

import defaultRuntimeService from '../../services/runtime'

const RuntimeServiceContext = createContext(defaultRuntimeService)

const WithRuntimeService = props => {

    const contextRuntimeService = useContext(RuntimeServiceContext)
    const runtimeService = props.runtimeService || contextRuntimeService

    return <RuntimeServiceContext.Provider value={runtimeService}>{props.children}</RuntimeServiceContext.Provider>
}

export {RuntimeServiceContext, WithRuntimeService}
