import React from 'react'
import { render } from '@testing-library/react'

import { TwitchConfigContext, WithTwitchConfig } from './TwitchConfigContext'

describe('The Twitch Config Context', () => {

    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }

    beforeEach(() => {
        providedValue = undefined
    })

    it('should supply a config', () => {
        render(<WithTwitchConfig>< TwitchConfigContext.Consumer>{storeProvidedValue}</TwitchConfigContext.Consumer></WithTwitchConfig>)
        expect(providedValue).not.toBeUndefined()
    })

    it('should supply the given twitch config', () => {
        render(<WithTwitchConfig twitchConfig={{ twitch: { test: true } }}>< TwitchConfigContext.Consumer>{storeProvidedValue}</TwitchConfigContext.Consumer></WithTwitchConfig>)
        expect(providedValue).toEqual({ twitch: { test: true } })
    })

})
