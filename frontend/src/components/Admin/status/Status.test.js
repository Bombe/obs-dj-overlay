import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'chai'

import WithRuntimeVersion from '../../../contexts/runtimeVersion'

import Status from './Status'

describe('The Status bar', () => {

    it('should contain a link to the project’s github', async () => {
        render(<Status/>)
        await waitFor(() => expect(screen.getByText(/obs-dj-overlay/i)).to.exist)
    })

    it('should contain the current version number', async () => {
        render(<WithRuntimeVersion runtimeVersion={{ name: '1.2.3', hash: '4567' }}><Status/></WithRuntimeVersion>)
        await waitFor(() => expect(screen.getByText('1.2.3')).to.exist)
    })

})
