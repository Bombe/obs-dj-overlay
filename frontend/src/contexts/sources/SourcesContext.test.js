import React from 'react'
import {expect} from 'chai'
import {act, render} from '@testing-library/react'

import WithSourcesService from '../sourcesService'

import {SourcesContext, WithSources} from './SourcesContext'

describe('The Sources Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide the sources from the sources context', async () => {
        const testSourcesService = {get: () => Promise.resolve({foo: 'bar'})}
        await act(async () => {
            render(<WithSourcesService sourcesService={testSourcesService}><WithSources><SourcesContext.Consumer>{storeProvidedValue}</SourcesContext.Consumer></WithSources></WithSourcesService>)
        })
        expect(providedValue).to.deep.eql({foo: 'bar', loaded: true})
    })

    it('should provide the given sources', () => {
        const testSources = {foo: 'bar'}
        render(<WithSources sources={testSources}><SourcesContext.Consumer>{storeProvidedValue}</SourcesContext.Consumer></WithSources>)
        expect(providedValue).to.deep.eql({foo: 'bar'})
    })

})
