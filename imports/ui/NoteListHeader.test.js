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

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    it('should call meteorCall on click', function() {
      const spy = sinon.spy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy.args[0][0]).to.equal('notes.insert');
    });
  });
}
