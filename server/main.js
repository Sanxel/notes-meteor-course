import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  process.env.TEST_BROWSER_DRIVER = 'chrome';
  console.log(Meteor.isProduction);
  console.log(Meteor.isDevelopment);
});
