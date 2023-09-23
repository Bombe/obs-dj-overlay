import React from 'react'
import {render} from '@testing-library/react'
import {expect} from 'chai'

import {RuntimeServiceContext, WithRuntimeService} from './RuntimeServiceContext'

describe('The Runtime Service Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    it('should provide the given runtime service', () => {
        const testRuntimeService = {foo: 'bar'}
        render(<WithRuntimeService runtimeService={testRuntimeService}><RuntimeServiceContext.Consumer>{storeProvidedValue}</RuntimeServiceContext.Consumer></WithRuntimeService>)
        expect(providedValue).to.deep.eql({foo: 'bar'})
    })

    it('should provide a default runtime service', () => {
        render(<WithRuntimeService><RuntimeServiceContext.Consumer>{storeProvidedValue}</RuntimeServiceContext.Consumer></WithRuntimeService>)
        expect(providedValue).to.not.be.undefined
    })

})
