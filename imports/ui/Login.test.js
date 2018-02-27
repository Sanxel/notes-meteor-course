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

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function() {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}} />);

      wrapper.setState({ error });
      const pText = wrapper.find('p').text();
      expect(pText).to.equal(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call LoginWithPassword with the form data', function() {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.args[0][0]).to.deep.equal({ email });
      expect(spy.args[0][1]).to.equal(password);
    });

    it('should set LoginWithPassword callback errors', function() {
      const spy = sinon.spy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');

      spy.args[0][2]({});
      expect(wrapper.state('error').length).to.not.equal(0);

      spy.args[0][2]();
      expect(wrapper.state('error').length).to.equal(0);
    });
  });
}
