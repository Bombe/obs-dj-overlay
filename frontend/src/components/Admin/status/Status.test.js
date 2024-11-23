import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import WithRuntimeVersion from '../../../contexts/runtimeVersion'
import WithTwitchConfig from '../../../contexts/twitchConfig'

import Status from './Status'

describe('The Status bar', () => {

    it('should contain a link to the project’s github', async () => {
        render(<Status/>)
        await waitFor(() => expect(screen.getByText(/obs-dj-overlay/i)).toBeDefined())
    })

    it('should contain the current version number', async () => {
        render(<WithRuntimeVersion runtimeVersion={{ name: '1.2.3', hash: '4567' }}><Status/></WithRuntimeVersion>)
        await waitFor(() => expect(screen.getByText('1.2.3')).toBeDefined())
    })

    it('should contain a message if the twitch configuration is incomplete', async () => {
        render(<WithTwitchConfig twitchConfig={{ isConfigured: false }}><Status/></WithTwitchConfig>)
        await waitFor(() => expect(screen.getByText(/twitch.*config/i)).toBeDefined())
    })

    it('should not contain a message if the twitch configuration is complete', async () => {
        render(<WithTwitchConfig twitchConfig={{ isConfigured: true }}><Status/></WithTwitchConfig>)
        expect(screen.queryByText(/twitch.*config/i)).toBeNull()
    })

})
