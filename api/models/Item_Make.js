/**
* Item_Make.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: "localDiskDb",

  attributes: {
    item_type: {
      model: 'Item_Type'
    },

    manufacturer: {
      model: 'Manufacturer'
    },

    sku: {
      type: 'string',
      unique: true,
      required: true
    },

    description: {
      type: 'string',
    },

    created_by: {
      model: 'User'
    },

    last_modified_by: {
      model: 'User'
    }
  }
};

