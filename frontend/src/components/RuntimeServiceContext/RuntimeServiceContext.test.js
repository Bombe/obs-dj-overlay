import React from 'react'
import {render} from '@testing-library/react'
import {expect} from 'chai'

import {RuntimeServiceContext, WithRuntimeService} from './RuntimeServiceContext'

describe('The Runtime Service Context', () => {

    it('should provide the given runtime service', () => {
        let providedRuntimeService
        const testRuntimeService = {
            get: () => {
            }
        }
        render(<WithRuntimeService runtimeService={testRuntimeService}><RuntimeServiceContext.Consumer>{value => (providedRuntimeService = value) && <></>}</RuntimeServiceContext.Consumer></WithRuntimeService>)
        expect(providedRuntimeService).to.equal(testRuntimeService)
    });

});
