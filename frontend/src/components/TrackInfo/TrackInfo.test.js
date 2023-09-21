import {render, screen} from "@testing-library/react"
import React from 'react'
import {expect} from 'chai'

import TrackInfo from '.'
import WithOverlayInfo from '../../context/overlayInfo';

describe('The Track Info element', () => {

    it('should not show anything if no track is defined', () => {
        render(<WithOverlayInfo overlayInfo={{}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.queryByTitle('artist')).to.be.null
    });

    it('should not show the track number if no track number is set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.queryByTitle('track-number')).to.be.null
    });

    it('should not show the track number if track number is zero', () => {
        render(<WithOverlayInfo overlayInfo={{track: { number: 0, artist: 'Artist'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.queryByTitle('track-number')).to.be.null
    });

    it('should show the track number if track number is set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {number: 12, artist: 'Artist'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.getByTitle('track-number').textContent).to.eql('12')
    });

    it('should show the artist if a track is set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.getByTitle('artist').textContent).to.eql('Artist')
    });

    it('should show the title if a track is set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {title: 'Title'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.getByTitle('title').textContent).to.eql('Title')
    });

    it('should not display last artist if last artist is not set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist'}, lastTrack: {artist: '', title: 'Last Title'}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.queryByTitle('last-artist')).to.be.null
        expect(screen.queryByTitle('last-title')).to.be.null
    });

    it('should not display last artist if last title is not set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist'}, lastTrack: {artist: 'Last Artist', title: ''}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.queryByTitle('last-artist')).to.be.null
        expect(screen.queryByTitle('last-title')).to.be.null
    });

    it('should display last artist and title if last artist and title are set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist'}, lastTrack: {artist: 'Last Artist', title: 'Last Title'}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.getByTitle('last-artist').textContent).to.eql('Last Artist')
        expect(screen.getByTitle('last-title').textContent).to.eq('Last Title')
    });

    it('should not display the cover image if no cover image is set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.queryByTitle('cover-image')).to.be.null
    });

    it('should display the cover image if cover image is set', () => {
        render(<WithOverlayInfo overlayInfo={{track: {artist: 'Artist', cover: 'img:a'}, lastTrack: {}}}><TrackInfo/></WithOverlayInfo>)
        expect(screen.getByTitle('cover-image').tagName).to.eql('IMG')
        expect(screen.getByTitle('cover-image').getAttribute("src")).to.eql('img:a')
    });

});
