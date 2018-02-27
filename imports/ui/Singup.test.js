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
chai.use(sinonChai);

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function() {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={() => {}} />);

      wrapper.setState({ error });
      const pText = wrapper.find('p').text();
      expect(pText).to.equal(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call createUser with the form data', function() {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.args[0][0]).to.deep.equal({ email, password });
    });

    it('should set error if short password', function() {
      const email = 'andrew@test.com';
      const password = '123   ';
      const spy = sinon.spy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).to.be.above(0);
    });

    it('should set createUser callback errors', function() {
      const password = 'password123!';
      const reason = 'This is why it failed';
      const spy = sinon.spy();
      const wrapper = mount(<Signup createUser={spy} />);
      wrapper.ref('password').value = password;

      wrapper.find('form').simulate('submit');

      spy.args[0][1]({ reason });
      expect(wrapper.state('error')).to.equal(reason);

      spy.args[0][1]();
      expect(wrapper.state('error').length).to.equal(0);
    });
  });
}
