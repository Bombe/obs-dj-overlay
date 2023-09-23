import React from 'react'
import {render} from '@testing-library/react'
import {expect} from 'chai'

import {SourcesServiceContext, WithSourcesService} from './SourcesService'

describe('The Sources Service Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide a default sources service', () => {
        render(<WithSourcesService><SourcesServiceContext.Consumer>{storeProvidedValue}</SourcesServiceContext.Consumer></WithSourcesService>)
        expect(providedValue).to.not.be.undefined
    })

    it('should provide the given sources service', () => {
        const testSourcesService = {foo: 'bar'}
        render(<WithSourcesService sourcesService={testSourcesService}><SourcesServiceContext.Consumer>{storeProvidedValue}</SourcesServiceContext.Consumer></WithSourcesService>)
        expect(providedValue).to.deep.eql({foo: 'bar'})
    })

})
