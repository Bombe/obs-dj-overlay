import {act, render} from '@testing-library/react'
import {expect} from 'chai'

import {contextCapture} from '../../utils/tests'
import {TrackContext, WithTrack} from './TrackContext'

const context = contextCapture()

describe('The Track Context', () => {

    it('should have empty fields for the track', () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        expect(context.value().artist).to.be.empty
        expect(context.value().title).to.be.empty
        expect(context.value().cover).to.be.empty
    })

    it('should set the artist if a string is given as artist', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setArtist('artist'))
        expect(context.value().artist).to.eql('artist')
    })

    it('should set a combined artist if an array of strings is given', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setArtist(['A', 'B']))
        expect(context.value().artist).to.eql('A, B')
    })

    it('should set title is a string is given as title', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title'))
        expect(context.value().title).to.eql('Title')
    })

    it('should clean the title if the cleanTitle flag is not given', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Original Mix)'))
        expect(context.value().title).to.eql('Title')
    })

    it('should clean the title if the cleanTitle flag is true', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Original Mix)', true))
        expect(context.value().title).to.eql('Title')
    })

    it('should not clean the title if the cleanTitle flag is false', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Original Mix)', false))
        expect(context.value().title).to.eql('Title (Original Mix)')
    })

    it('should not include original mixes in the title', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Original Mix)'))
        expect(context.value().title).to.eql('Title')
    })

    it('should not include original version in the title', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Original Version)'))
        expect(context.value().title).to.eql('Title')
    })

    it('should not include original mixes in the title when that’s combined with an artist', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Awesome Artist Original Remix)'))
        expect(context.value().title).to.eql('Title (Awesome Artist Remix)')
    })

    it('should not include extended mixes in the title', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Extended Mix)'))
        expect(context.value().title).to.eql('Title')
    })

    it('should not include extended version in the title', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Extended Version)'))
        expect(context.value().title).to.eql('Title')
    })

    it('should not include extended mixes in the title when that’s combined with an artist', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (Awesome Artist Extended Mix)'))
        expect(context.value().title).to.eql('Title (Awesome Artist Mix)')
    })

    it('should handle several phrases in parentheses correctly', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async() => context.value().setTitle('Title (Words) (More Words)'))
        expect(context.value().title).to.eql('Title (Words) (More Words)')
    })

    it('should handle phrases in square brackets the same as phrases in parens', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async() => context.value().setTitle('Title [Words] (More Words) [Extended Mix]'))
        expect(context.value().title).to.eql('Title (Words) (More Words)')
    })

    it('should remove “featuring” from track names', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title feat. Another Artist (More Words)'))
        expect(context.value().title).to.eql('Title (More Words)')
    })

    it('should remove “featuring” from track names when it is in parens', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setTitle('Title (feat. Another Artist) (More Words)'))
        expect(context.value().title).to.eql('Title (More Words)')
    })

    it('should set the cover', async () => {
        render(<WithTrack><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        await act(async () => context.value().setCover('cover-image'))
        expect(context.value().cover).to.eql('cover-image')
    })

    it('should provide the given track state', () => {
        render(<WithTrack track={{track: 'foo'}}><TrackContext.Consumer>{context.capture}</TrackContext.Consumer></WithTrack>)
        expect(context.value()).to.be.eql({track: 'foo'})
    })

})
