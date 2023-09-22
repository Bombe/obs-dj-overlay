import React from 'react'
import {act, render} from '@testing-library/react'
import {expect} from 'chai'

import WithOverlayService from '../../components/OverlayServiceContext'

import {OverlayInfoContext, WithOverlayInfo} from './OverlayInfoContext'

describe('The OverlayInfo Provider', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide the given overlay info', () => {
        const testOverlayInfo = {foo: 'bar'}
        render(<WithOverlayInfo overlayInfo={testOverlayInfo}><OverlayInfoContext.Consumer>{storeProvidedValue}</OverlayInfoContext.Consumer></WithOverlayInfo>)
        expect(providedValue).to.deep.eql({foo: 'bar'})
    });

    it('should use the value from the provided service context', async () => {
        const testOverlayInfoService = {defaultValue: () => ({baz: 'quo'}), get: () => Promise.resolve({foo: 'bar'})}
        await act(async () => {
            render(<WithOverlayService overlayService={testOverlayInfoService}><WithOverlayInfo><OverlayInfoContext.Consumer>{storeProvidedValue}</OverlayInfoContext.Consumer></WithOverlayInfo></WithOverlayService>)
        })
        expect(providedValue).to.deep.eql({foo: 'bar'})
    });

});
