angular.module('uiRouterSample.contacts.service', [

])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('contactsty', ['$http', 'utils', function ($http, utils) {
  var path = '/contacts.json';
  var contacts = $http.get(path).then(function (resp) {
    return resp.data.contacts;
  });

  var factory = {};
  factory.allty = function () {
    return contacts;
  };
  factory.get = function (id) {
    return contacts.then(function(){
      return utils.findById(contacts, id);
    })
  };
  return factory;
}]);
