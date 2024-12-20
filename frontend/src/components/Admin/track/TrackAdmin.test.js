import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { expect } from 'chai'

import { user } from '../../../utils/tests'
import WithOverlayService from '../../../contexts/overlayService'
import WithTrack from '../../../contexts/track'
import TrackAdmin from './'

describe('The Track Administration', () => {

    const overlayService = {
        get: () => ({
            then: () => {
            }
        }),
    }

    it('has a text field labeled "number of the track"', async () => {
        render(<WithTrack><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await waitFor(() => expect(screen.getByLabelText(/the number of the track/i)).to.exist)
    })

    it('should have a field labeled "cover"', async () => {
        render(<WithTrack><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await waitFor(() => expect(screen.getByLabelText(/cover/i)).to.exist)
    })

    it('should send all entered data to overlay service', async () => {
        let capturedValues
        const capturingOverlayService = {
            ...overlayService,
            setTrackInfo: (number, artist, title, cover) => {
                capturedValues = {number, artist, title, cover}
            }
        }
        render(<WithTrack><WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.type(screen.getByLabelText(/number/i), '12')
        await user.type(screen.getByLabelText(/artist of the track/i), 'Artist')
        await user.type(screen.getByLabelText(/title of the track/i), 'Title')
        await user.type(screen.getByLabelText(/cover/i), 'Cover')
        await user.click(screen.getByRole('button', {name: /update/i}))
        expect(capturedValues).to.deep.eql({number: 12, artist: 'Artist', title: 'Title', cover: 'Cover'})
    })

    it('should have a button labeled “reset”', async () => {
        render(<WithTrack><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await waitFor(() => expect(screen.getByText(/reset/i)).to.exist)
    })

    it('should reset the last track when reset button is pressed', async () => {
        let resetLastTrackCalled = false
        const capturingOverlayService = {
            ...overlayService, resetLastTrack: () => resetLastTrackCalled = true, setTrackInfo: () => {
            }
        }
        render(<WithTrack><WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.click(screen.getByText(/reset/i))
        expect(resetLastTrackCalled).to.be.true
    })

    it('should clear the current track when reset button is pressed', async () => {
        let capturedSetter = {}
        const capturingOverlayService = {
            ...overlayService, resetLastTrack: () => {
            }, setTrackInfo: (number, artist, title, cover) => capturedSetter = {number, artist, title, cover}
        }
        render(<WithTrack><WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.click(screen.getByText(/reset/i))
        expect(capturedSetter).to.deep.eql({number: 0, artist: '', title: '', cover: ''})
    })

    it('should clear the input fields when reset button is pressed', async () => {
        const capturingOverlayService = {
            ...overlayService,
            get: () => Promise.resolve({track: {number: 0, artist: '', title: '', cover: ''}}),
            resetLastTrack: () => {
            },
            setTrackInfo: () => {
            }
        }
        render(<WithTrack><WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.type(screen.getByLabelText(/number/i), '12')
        await user.type(screen.getByLabelText(/artist of the track/i), 'artist')
        await user.type(screen.getByLabelText(/title of the track/i), 'title')
        await user.type(screen.getByLabelText(/cover/i), 'cover')
        await user.click(screen.getByText(/reset/i))
        expect(screen.getByLabelText(/number/i).value).to.eql('0')
        expect(screen.getByLabelText(/artist of the track/i).value).to.eql('')
        expect(screen.getByLabelText(/title of the track/i).value).to.eql('')
        expect(screen.getByLabelText(/cover/i).value).to.eql('')
    })

    it('should have a button labeled “amend”', async () => {
        render(<WithTrack><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await waitFor(() => expect(screen.getByText(/amend/i)).to.exist)
    })

    it('should send all entered data to overlay service when amending', async () => {
        let capturedValues
        const capturingOverlayService = {
            ...overlayService,
            amendCurrentTrack: (number, artist, title, cover) => {
                capturedValues = {number, artist, title, cover}
            }
        }
        render(<WithTrack><WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.type(screen.getByLabelText(/number/i), '12')
        await user.type(screen.getByLabelText(/artist of the track/i), 'Artist')
        await user.type(screen.getByLabelText(/title of the track/i), 'Title')
        await user.type(screen.getByLabelText(/cover/i), 'Cover')
        await user.click(screen.getByRole('button', {name: /amend/i}))
        expect(capturedValues).to.deep.eql({number: 12, artist: 'Artist', title: 'Title', cover: 'Cover'})
    })

    it('should use the values from the track context', async () => {
        render(<WithTrack track={{ artist: 'Artist', title: 'Title', cover: 'Cover' }}><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await waitFor(() => {
            expect(screen.getByLabelText(/artist of the track/i).value).to.eql('Artist')
            expect(screen.getByLabelText(/title of the track/i).value).to.eql('Title')
            expect(screen.getByLabelText(/cover/i).value).to.eql('Cover')
        })
    })

    it('should disable cleaning when editing the title', async () => {
        let receivedTitle
        let receivedCleaningFlag
        const setTitle = (title, cleaningFlag) => {
            receivedTitle = title
            receivedCleaningFlag = cleaningFlag
        }
        render(<WithTrack track={{setTitle}}><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.type(screen.getByLabelText(/title of the track/i), 'Title (')
        expect(receivedTitle).to.be.eql('Title (')
        expect(receivedCleaningFlag).to.be.eql(false)
    })

    it('should clean the title when the “clean title” button is pressed', async () => {
        let cleanTitleCalled
        const cleanTitle = () => cleanTitleCalled = true
        const setTitle = () => {}
        render(<WithTrack track={{ artist: 'Artist', title: 'Title', cover: 'Cover', setTitle, cleanTitle }}><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.type(screen.getByLabelText(/title of the track/i), 'Title O\' Track')
        await user.click(screen.getByLabelText(/clean title/i))
        expect(cleanTitleCalled).to.eql(true)
    })

    it('should clean the artist when the “clean artist” button is pressed', async () => {
        let cleanArtistCalled
        const cleanArtist = () => cleanArtistCalled = true
        const setArtist = () => {}
        render(<WithTrack track={{ artist: 'Artist', title: 'Title', cover: 'Cover', setArtist, cleanArtist }}><WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService></WithTrack>)
        await user.type(screen.getByLabelText(/artist of the track/i), 'Artist O\' Track')
        await user.click(screen.getByLabelText(/clean artist/i))
        expect(cleanArtistCalled).to.eql(true)
    })

})
