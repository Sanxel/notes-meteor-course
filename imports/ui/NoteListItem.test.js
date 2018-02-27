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

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    it('should render title and timestamp', function() {
      const title = 'My title here';
      const updatedAt = 1519655475946;
      const wrapper = mount(<NoteListItem note={{ title: 'Mytitlehere', updatedAt }} />);

      expect(wrapper.find('h5').text()).to.equal('Mytitlehere');
      expect(wrapper.find('p').text()).to.equal('2/26/18');
    });

    it('should set default title if no title set', function() {
      const title = '';
      const updatedAt = 1519655475946;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).to.equal('Untitled note');
    });
  });
}
