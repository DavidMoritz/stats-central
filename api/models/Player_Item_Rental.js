/**
* Player_Item_Rental.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: "localDiskDb",

  attributes: {
    item: {
      model: 'Item'
    },

    player: {
      model: 'Player'
    },

    date_rented: {
      type: 'datetime'
    },

    date_returned: {
      type: 'datetime'
    },

    status: {
      type: 'string'
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

