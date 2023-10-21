import {createContext, useContext} from 'react'

import HistoryService from '../../services/history'

const HistoryServiceContext = createContext(HistoryService)

const WithHistoryService = props => {
    const historyService = useContext(HistoryServiceContext)

    return <HistoryServiceContext.Provider value={props.historyService || historyService}>{props.children}</HistoryServiceContext.Provider>
}

export {HistoryServiceContext, WithHistoryService}
