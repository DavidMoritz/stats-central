/**
* Item_Type.js
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
      collection: 'School_Sport_Item_Type',
      via: 'item_type'
    },
    item_makes: {
      collection: 'Item_Make',
      via: 'item_type'
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

