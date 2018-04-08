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

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function() {
    let browserHistory;
    let call;

    beforeEach(function() {
      call = sinon.spy();
      browserHistory = {
        push: sinon.spy()
      };
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).to.equal('Pick or create a note to get started.');
    });
    it('should render Note not found message', function() {
      const wrapper = mount(
        <Editor selectedNoteId={notes[0]._id} browserHistory={browserHistory} call={call} />
      );
      expect(wrapper.find('p').text()).to.equal('Note not found.');
    });
    it('should remove note', function() {
      const wrapper = mount(
        <Editor
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
          note={notes[0]}
        />
      );
      wrapper.find('button').simulate('click');
      expect(browserHistory.push.args[0][0]).to.equal('/dashboard');
      expect(call.args[0][0]).to.equal('notes.remove');
      expect(call.args[0][1]).to.equal(notes[0]._id);
    });

    it('should update the note body on textarea change', function() {
      const newBody = 'This is my new body text';
      const wrapper = mount(
        <Editor
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
          note={notes[0]}
        />
      );

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).to.equal(newBody);
      expect(call.args[0][0]).to.equal('notes.update');
      expect(call.args[0][1]).to.equal(notes[0]._id);
      expect(call.args[0][2]).to.deep.equal({ body: newBody });
    });

    it('should update the note title on input change', function() {
      const newTitle = 'This is my new title text';
      const wrapper = mount(
        <Editor
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
          note={notes[0]}
        />
      );

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).to.equal(newTitle);
      expect(call.args[0][0]).to.equal('notes.update');
      expect(call.args[0][1]).to.equal(notes[0]._id);
      expect(call.args[0][2]).to.deep.equal({ title: newTitle });
    });

    it('should set state for new note', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('title')).to.equal(notes[0].title);
      expect(wrapper.state('body')).to.equal(notes[0].body);
    });

    it('should not set state if note prop not provided', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state('title')).to.equal('');
      expect(wrapper.state('body')).to.equal('');
    });
  });
}
