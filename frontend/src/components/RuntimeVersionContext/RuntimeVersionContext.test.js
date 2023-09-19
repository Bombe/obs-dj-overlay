import React from 'react'
import {expect} from 'chai'
import {act, render} from '@testing-library/react'

import {RuntimeVersionContext, WithRuntimeVersion} from "./RuntimeVersionContext";
import WithRuntimeService from "../RuntimeServiceContext";

describe('The Runtime Version Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should provide the version from the runtime service context', async () => {
        const runtimeService = {get: () => Promise.resolve({name: 'test', hash: '01234567'})}
        await act(async () => render(<WithRuntimeService runtimeService={runtimeService}><WithRuntimeVersion><RuntimeVersionContext.Consumer>{storeProvidedValue}</RuntimeVersionContext.Consumer></WithRuntimeVersion></WithRuntimeService>))
        expect(providedValue).to.deep.eql({name: 'test', hash: '01234567'})
    });

    it('should provide the given runtime version', () => {
        render(<WithRuntimeVersion runtimeVersion={{name: 'test', hash: '01234567'}}><RuntimeVersionContext.Consumer>{storeProvidedValue}</RuntimeVersionContext.Consumer></WithRuntimeVersion>)
        expect(providedValue).to.deep.eql({name: 'test', hash: '01234567'})
    });

});
