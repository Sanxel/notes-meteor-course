import { Meteor } from 'meteor/meteor';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var expect = chai.expect;
chai.use(sinonChai);

import NoteListItem from './NoteListItem';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: sinon.spy()
      };
    });

    it('should render title and timestamp', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);

      expect(wrapper.find('h5').text()).to.equal(notes[0].title);
      expect(wrapper.find('p').text()).to.equal('2/26/18');
    });

    it('should set default title if no title set', function() {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session} />);

      expect(wrapper.find('h5').text()).to.equal('Untitled note');
    });

    it('should call set on click', function() {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session} />);

      wrapper.find('div').simulate('click');
      // expect(Session.set).to.have.been.calledWith('selectedNoteId', notes[0]._id);
      // sinon.assert.calledWith(Session.set, sinon.match.has('selectedNoteId', notes[0]._id));
    });
  });
}
