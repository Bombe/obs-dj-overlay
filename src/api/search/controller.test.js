const {expect} = require('chai')
const createResponseObject = require('../test/response')

describe('The Search Controller', () => {

    let response
    beforeEach(() => {
        response = createResponseObject()
    })

    it('should extract the search terms from the body', () => {
        let providedTerms
        const searchService = {
            search: terms => {
                providedTerms = terms
                return Promise.resolve([])
            }
        }
        const controller = require('./controller')(searchService)
        controller.search({body: {q: 'some words with things'}}, response)
        expect(providedTerms).to.equal('some words with things')
    })

    it('should send the results back as json', async () => {
        const searchService = {
            search: terms => Promise.resolve([{artists: ['Artist'], title: 'Title', mix: 'Mix', cover: 'Cover'}])
        }
        const controller = require('./controller')(searchService)
        await controller.search({body: {q: 'some words with things'}}, response)
        expect(response.setJson()).to.deep.eql([{artists: ['Artist'], title: 'Title', mix: 'Mix', cover: 'Cover'}])
    })

})
