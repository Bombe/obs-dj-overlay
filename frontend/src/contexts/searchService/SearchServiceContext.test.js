import React from 'react'
import {render} from '@testing-library/react'
import {expect} from 'chai'

import {SearchServiceContext, WithSearchService} from './SearchServiceContext'

describe('The Cover Search Service Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide a default cover search service', () => {
        render(<WithSearchService><SearchServiceContext.Consumer>{storeProvidedValue}</SearchServiceContext.Consumer></WithSearchService>)
        expect(providedValue).to.not.be.undefined
    })

    it('should provide the given search service', () => {
        const testSearchService = {foo: 'bar'}
        render(<WithSearchService searchService={testSearchService}><SearchServiceContext.Consumer>{storeProvidedValue}</SearchServiceContext.Consumer></WithSearchService>)
        expect(providedValue).to.equal(testSearchService)
    })

})
