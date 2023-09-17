import React from "react"
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {expect} from 'chai'

import {CrateAdmin} from './CrateAdmin'

describe('The Crate Admin', () => {

    it('should start with an empty crate', () => {
        render(<CrateAdmin/>)
        expect(screen.queryAllByTitle("record")).to.be.an('array').and.to.be.empty
    });

    it('should have a button labeled "import"', () => {
        render(<CrateAdmin/>)
        expect(screen.getByRole('button', {name: /import/i})).to.exist
    });

    it('should have an input field for the import', () => {
        render(<CrateAdmin/>)
        expect(screen.getByLabelText(/import/i)).to.exist
    });

    it('should not import anything if input field does not contain anything', () => {
        render(<CrateAdmin/>)
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.queryAllByTitle('record')).to.be.an('array').and.to.be.empty
    });

    it('should import a single track from input field', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(1)
    });

    it('should clear the input field after successful importing', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.getByLabelText(/import/i).value).to.be.empty
    });

    it('should not clear the input field after unsuccessful importing', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","tit')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.getByLabelText(/import/i).value).to.be.eql('[{"artist":"Artist","tit')
    });

    it('should import multiple tracks from input field', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"},{"artist":"Artist 2","title":"Title 2","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(2)
    });

    it('should add imported tracks to existing tracks', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist 2","title":"Title 2","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(2)
    });

    it('should have a button to clear the crates', () => {
        render(<CrateAdmin/>)
        expect(screen.getByRole('button', {name: /clear/i})).to.exist
    });

    it('should clear the crate when button is pressed', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"},{"artist":"Artist 2","title":"Title 2","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        userEvent.click(screen.getByRole('button', {name: /clear/i}))
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(0)
    });

    it('should call given setters if a row is clicked', () => {
        let calledSetters = {}
        const setArtist = artist => calledSetters = {...calledSetters, artist }
        const setTitle = title => calledSetters = {...calledSetters, title }
        const setCover = cover => calledSetters = {...calledSetters, cover }
        render(<CrateAdmin setArtist={setArtist} setTitle={setTitle} setCover={setCover}/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"id":"id1","artist":"Artist","title":"Title","cover":"Cover"},{"id":"id2","artist":"Artist 2","title":"Title 2","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        userEvent.dblClick(document.body.querySelector('[title="record"][data-id="id2"]'))
        expect(calledSetters).to.be.deep.eql({artist: 'Artist 2', title: 'Title 2', cover: 'Cover 2'})
    });

    it('should sort entries on importing', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"id":"D1","artist":"D","title":"D","cover":"Cover"},{"id":"B1","artist":"B","title":"B","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(Array.from(document.body.querySelectorAll('[title="record"]')).map(element => ({id: element.getAttribute('data-id')}))).to.be.deep.eql([{id: 'B1'}, {id: 'D1'}])
    });

    it('should keep all entries sorted', () => {
        render(<CrateAdmin/>)
        userEvent.type(screen.getByLabelText(/import/i), '[{"id":"D1","artist":"D","title":"D","cover":"Cover"},{"id":"B1","artist":"B","title":"B","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        userEvent.type(screen.getByLabelText(/import/i), '[{"id":"C1","artist":"C","title":"C","cover":"Cover"},{"id":"A1","artist":"A","title":"A","cover":"Cover 2"},{"id":"F1","artist":"F","title":"F","cover":"Cover 2"}]')
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(Array.from(document.body.querySelectorAll('[title="record"]')).map(element => ({id: element.getAttribute('data-id')}))).to.be.deep.eql([{id: 'A1'}, {id: 'B1'}, {id: 'C1'}, {id: 'D1'}, {id: 'F1'}])
    });

});
