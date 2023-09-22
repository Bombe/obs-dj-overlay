import React from 'react'
import {render} from "@testing-library/react"
import {expect} from 'chai'

import {CrateServiceContext, WithCrateService} from './WithCrateService'

describe('The Crate Service Context Provider', () => {

    let crateService

    const storeCrateService = value => {
        crateService = value
        return <span/>
    }

    beforeEach(() => {
        crateService = undefined
    })

    it('should provide a default crate service', () => {
        render(<WithCrateService><CrateServiceContext.Consumer>{storeCrateService}</CrateServiceContext.Consumer></WithCrateService>)
        expect(crateService).to.not.be.undefined
    })

    it('should provide the overridden crate service', () => {
        const fakeCrateService = {foo: 'bar'}
        render(<WithCrateService crateService={fakeCrateService}><CrateServiceContext.Consumer>{storeCrateService}</CrateServiceContext.Consumer></WithCrateService>)
        expect(crateService).to.deep.eql({foo: 'bar'})
    })

})
