import { Meteor } from 'meteor/meteor';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

import { PrivateHeader } from './PrivateHeader';

import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var expect = chai.expect;
// var should = chai.should();

chai.use(sinonChai);
// chai.use(spies);

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount(<PrivateHeader title="Test title" handleLotout={() => {}} />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).to.equal('Logout');
    });

    it('should use title prop as h1 text', function() {
      const title = 'Test title here';
      const wrapper = mount(<PrivateHeader title={title} handleLotout={() => {}} />);
      const h1Text = wrapper.find('h1').text();

      expect(h1Text).to.equal(title);
    });

    // it('should call the function', function() {
    //   const spy = sinon.spy();
    //   spy(3, 4, 123);
    //   spy('Andrew');
    //   expect(spy).to.have.been.calledWith(3, 4, 123);
    // });

    it('should call handleLogout on click', function() {
      const spy = sinon.spy();
      const wrapper = mount(<PrivateHeader title="Title" handleLotout={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.called;
    });
  });
}
