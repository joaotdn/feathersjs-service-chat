'use strict';

const service = require('feathers-sequelize');
const messages = require('./messages-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: messages(app.get('sequelize')),
    paginate: {
      default: 50,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messagesService = app.service('/messages');

  // Set up our before hooks
  messagesService.before(hooks.before);

  // Set up our after hooks
  messagesService.after(hooks.after);
};
