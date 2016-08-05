/**
* School.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: "localDiskDb",

  attributes: {
    name: {
      type: 'string',
      required: true
    },

    sports: {
      collection: 'Sport',
      via: 'schools',
      dominant: true
    },

    players: {
      collection: 'Player',
      via: 'school'
    },

    users: {
      collection: 'User',
      via: 'schools',
      dominant: true
    },

    sportItems: {
      collection: 'School_Sport_Item_Type',
      via: 'school',
      dominant: true
    },

    items: {
      collection: 'Item',
      via: 'school'
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

