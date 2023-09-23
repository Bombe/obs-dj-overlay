import React, {createContext, useContext} from 'react'

import SearchService from '../../services/search'

const SearchServiceContext = createContext(SearchService)

const WithSearchService = props => {

    const searchService = useContext(SearchServiceContext)

    return (
        <SearchServiceContext.Provider value={props.searchService || searchService}>
            {props.children}
        </SearchServiceContext.Provider>
    )
}

export {SearchServiceContext, WithSearchService}
