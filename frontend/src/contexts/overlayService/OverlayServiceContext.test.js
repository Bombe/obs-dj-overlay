import React from 'react'
import {render} from '@testing-library/react'
import {expect} from 'chai'

import {OverlayServiceContext, WithOverlayService} from './OverlayServiceContext'

describe('The Overlay Service Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide the given overlay service', () => {
        const testOverlayService = {foo: 'bar'}
        render(<WithOverlayService overlayService={testOverlayService}><OverlayServiceContext.Consumer>{storeProvidedValue}</OverlayServiceContext.Consumer></WithOverlayService>)
        expect(providedValue).to.deep.eql({foo: 'bar'})
    })

    it('should use a default overlay service', () => {
        render(<WithOverlayService><OverlayServiceContext.Consumer>{storeProvidedValue}</OverlayServiceContext.Consumer></WithOverlayService>)
        expect(providedValue).to.not.be.undefined
    })

})
