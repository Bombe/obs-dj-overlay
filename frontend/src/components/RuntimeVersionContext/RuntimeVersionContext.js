import React, {createContext, useContext, useEffect, useState} from 'react'

import {RuntimeServiceContext} from '../RuntimeServiceContext'

const RuntimeVersionContext = createContext({name: '', hash: ''})

const WithRuntimeVersion = (props) => {

    const runtimeService = useContext(RuntimeServiceContext)
    const [runtimeVersion, setRuntimeVersion] = useState(props.runtimeVersion)

    useEffect(() => {
        if (!props.runtimeVersion) {
            runtimeService.get()
                .then(setRuntimeVersion)
        }
    }, [props.runtimeVersion, runtimeService]);

    return <RuntimeVersionContext.Provider value={runtimeVersion}>
        {props.children}
    </RuntimeVersionContext.Provider>
}

export {RuntimeVersionContext, WithRuntimeVersion}
