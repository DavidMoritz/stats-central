/**
* Player.js
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

    school: {
      model: 'School'
    },

    rentals: {
      collection: 'Player_Item_Rental',
      via: 'player'
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

