import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { NoteList } from './NoteList';
import { Session } from 'meteor/session';

export class NoteListHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="item-list__header">
          <button
            className="button"
            onClick={() =>
              this.props.meteorCall('notes.insert', (err, res) => {
                if (res) {
                  this.props.Session.set('selectedNoteId', res);
                }
              })
            }
          >
            Create Note
          </button>

          <button
            className="button button2"
            onClick={() => {
              if (confirm('Are you sure you want to proceed?')) {
                this.props.meteorCall('notes.clearAll');
              }
            }}
          >
            Clear note list
          </button>
        </div>
        <div className="item-list_search-div search-box">
          <form autoComplete="off">
            <input
              type="text"
              autoComplete="false"
              name="focus"
              ref="SearchInput"
              required
              className="item-list_search search-box"
              placeholder="Search notes"
              onChange={this.props.SearchNotesHandler}
            />
            <button
              className="close-icon"
              type="reset"
              onClick={e => {
                this.refs.SearchInput.value = '';
                this.props.SearchNotesHandler(e);
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}

// NoteListHeader.propTypes = {
//   meteorCall: React.PropTypes.func.isRequired,
//   Session: React.PropTypes.object.isRequired
// };

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, NoteListHeader);
