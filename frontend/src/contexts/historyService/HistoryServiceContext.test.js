import {render} from '@testing-library/react'
import {expect} from 'chai'

import {HistoryServiceContext, WithHistoryService} from './HistoryServiceContext'

describe('The History Service Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide a default history service', () => {
        render(<WithHistoryService><HistoryServiceContext.Consumer>{storeProvidedValue}</HistoryServiceContext.Consumer></WithHistoryService>)
        expect(providedValue).to.not.be.undefined
    })

    it('should provide the given value', () => {
        const testHistoryService = {foo: 'bar'}
        render(<WithHistoryService historyService={testHistoryService}><HistoryServiceContext.Consumer>{storeProvidedValue}</HistoryServiceContext.Consumer></WithHistoryService>)
        expect(providedValue).to.be.equal(testHistoryService)
    })

})
