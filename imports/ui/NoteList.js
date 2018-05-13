import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader.js';
import NoteListItem from './NoteListItem.js';
import NoteListEmptyItem from './NoteListEmptyItem';

import { updateText2 } from './NoteListHeader.js';

export class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { SearchString: '' };
    this.SearchNotesHandler = this.SearchNotesHandler.bind(this);
  }
  SearchNotesHandler(e) {
    e.preventDefault();
    this.setState({ SearchString: e.target.value });
  }
  render() {
    return (
      <div className="item-list">
        <NoteListHeader SearchNotesHandler={this.SearchNotesHandler} />
        {this.props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
        {this.props.notes.map(note => {
          // var noteTitle = note.title;
          // var searchStr = this.state.SearchString;
          // var result = note.title.search(new RegExp(`${this.state.SearchString}`, 'i'));

          // if (result || this.state.SearchString === '') {
          //   return <NoteListItem key={note._id} note={note} />;
          // }

          if (note.title.toUpperCase().includes(this.state.SearchString.toUpperCase())) {
            return <NoteListItem key={note._id} note={note} />;
          }
        })}
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } })
      .fetch()
      .map(note => {
        return { ...note, selected: note._id == selectedNoteId };
      })
  };
}, NoteList);
