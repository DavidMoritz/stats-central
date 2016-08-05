/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //connection: 'someMysqlServer',

  attributes: {

    // The user's full name
    name: {
      type: 'string',
      required: true
    },

    schools: {
      collection: 'School',
      via: 'users'
    },

    // The user's title at their school
    title: {
      type: 'string'
    },

    currentSchool: {
      model: 'School'
    },

    currentSport: {
      model: 'Sport'
    },

    // The user's email address
    email: {
      type: 'email',
      required: true,
      unique: true
    },

    // The encrypted password for the user
    // e.g. asdgh8a249321e9dhgaslcbqn2913051#T(@GHASDGA
    encryptedPassword: {
      type: 'string',
      required: true
    },

    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    },

    // url for gravatar
    gravatarUrl: {
      type: 'string'
    }
  }
};
