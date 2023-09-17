import React from 'react'
import {render} from "@testing-library/react";
import {CrateServiceContext, WithCrateService} from "./WithCrateService";
import {expect} from 'chai'

describe('The Crate Service Context Provider', () => {

    let crateService

    const storeCrateService = value => {
        crateService = value
        return <span/>
    }

    it('should provide a default crate service', () => {
        render(<WithCrateService><CrateServiceContext.Consumer>{storeCrateService}</CrateServiceContext.Consumer></WithCrateService>)
        expect(crateService).to.have.keys('getRecords', 'importRecords', 'reset')
    });

    it('should provide the overridden crate service', () => {
        const fakeCrateService = {
            foo: () => {
            }
        }
        render(<WithCrateService crateService={fakeCrateService}><CrateServiceContext.Consumer>{storeCrateService}</CrateServiceContext.Consumer></WithCrateService>)
        expect(crateService).to.have.keys('foo')
    });

});
