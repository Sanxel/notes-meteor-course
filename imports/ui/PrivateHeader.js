import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

export const PrivateHeader = props => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLotout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLotout: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLotout: () => Accounts.logout()
  };
}, PrivateHeader);
