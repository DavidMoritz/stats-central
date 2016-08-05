/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: "localDiskDb",

  attributes: {
    school: {
      model: 'School'
    },

    item_make: {
      model: 'Item_Make'
    },

    item_type: {
      model: 'Item_Type'
    },

    rentals: {
      collection: 'Player_Item_Rental',
      via: 'item'
    },

    condition: 'string',

    isCheckedOut: 'boolean',

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

