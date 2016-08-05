/**
* School_Sport_Item_Type.js
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

    sport: {
      model: 'Sport'
    },

    item_type: {
      model: 'Item_Type'
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

