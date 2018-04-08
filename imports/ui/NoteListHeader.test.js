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

import { NoteListHeader } from './NoteListHeader';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    let meteorCall;
    let Session;

    beforeEach(function() {
      meteorCall = sinon.spy();
      Session = {
        set: sinon.spy()
      };
    });
    it('should call meteorCall on click', function() {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.args[0][1](undefined, notes[0]._id);

      expect(meteorCall.args[0][0]).to.equal('notes.insert');
      expect(Session.set.args[0][0]).to.equal('selectedNoteId');
      expect(Session.set.args[0][1]).to.equal(notes[0]._id);
    });

    it('should not set session for failed insert', function() {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.args[0][1]({}, undefined);

      expect(meteorCall.args[0][0]).to.equal('notes.insert');
      expect(Session.set).to.not.have.been.called;
    });
  });
}
