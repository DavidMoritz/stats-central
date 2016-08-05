/**
* Sport.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'localDiskDb',

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    schools: {
      collection: 'School',
      via: 'sports'
    },

    items: {
      collection: 'School_Sport_Item_Type',
      via: 'sport'
    },

    users: {
      collection: 'User',
      via: 'currentSport'
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

