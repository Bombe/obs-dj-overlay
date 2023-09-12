import {OverlayService as overlayService} from './OverlayService'
import {expect} from 'chai'

describe('The Overlay Service', () => {

    const defaultValue = overlayService.defaultValue()

    it('should have a default value with keys for all fields', () => {
        expect(defaultValue).to.have.all.keys('track', 'lastTrack', 'show', 'message', 'twitchUserName')
    })

    it('should have a default value with keys for the track', () => {
        expect(defaultValue.track).to.have.all.keys('number', 'artist', 'title', 'direction')
    })

    it('should have a default value with 0 for the track’s number', () => {
        expect(defaultValue.track.number).to.equal(0)
    })

    it('should have a default value with an empty string for the track’s artist', () => {
        expect(defaultValue.track.artist).to.equal("")
    })

    it('should have a default value with an empty string for the track’s title', () => {
        expect(defaultValue.track.title).to.equal("")
    })

    it('should have a default value with “up” for the track’s direction', () => {
        expect(defaultValue.track.direction).to.equal("up")
    })

    it('should have a default value with keys for the last track', () => {
        expect(defaultValue.lastTrack).to.have.all.keys('number', 'artist', 'title')
    })

    it('should have a default value with 0 for the last track’s number', () => {
        expect(defaultValue.lastTrack.number).to.equal(0)
    })

    it('should have a default value with an empty string for the last track’s artist', () => {
        expect(defaultValue.lastTrack.artist).to.equal("")
    })

    it('should have a default value with an empty string for the last track’s title', () => {
        expect(defaultValue.lastTrack.title).to.equal("")
    })

    it('should have a default value with keys for the show', () => {
        expect(defaultValue.show).to.have.all.keys('title', 'subtitle', 'nextShow')
    })

    it('should have a default value with an empty string for the show’s title', () => {
        expect(defaultValue.show.title).to.equal("")
    })

    it('should have a default value with an empty string for the show’s subtitle', () => {
        expect(defaultValue.show.subtitle).to.equal("")
    })

    it('should have a default value with an empty string for the show’s next show announcement', () => {
        expect(defaultValue.show.nextShow).to.equal("")
    })

    it('should have a default value with an empty string for the message', () => {
        expect(defaultValue.message).to.equal("")
    });

    it('should have a default value with an empty string for the Twitch username', () => {
        expect(defaultValue.twitchUserName).to.equal("")
    });

})
