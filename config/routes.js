/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  ////////////////////////////////////////////////////////////
  // Server-rendered HTML webpages
  ////////////////////////////////////////////////////////////

  'GET /': 'PageController.index',

  ////////////////////////////////////////////////////////////
  // JSON API
  ////////////////////////////////////////////////////////////

  'POST /signup': 'UserController.signup',
  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',

  'POST /userToSchool': 'SchoolController.addUser',
  'POST /sportToSchool': 'SchoolController.addSport',
  'POST /getSportItems': 'SchoolController.getSportItems',
  'POST /playerRental': 'SchoolController.playerRental',
  'POST /getItems': 'SchoolController.getItems',
  'POST /getItemType': 'SchoolController.getItemType',
  'POST /getRentedItems': 'SchoolController.getRentedItems',
  
  'POST /newSport': 'SportController.addSport',
  'POST /currentSport': 'SportController.currentSport',
  
  'POST /newPlayer': 'PlayerController.addPlayer',
  'POST /getRentals': 'PlayerController.getRentals',
  'POST /checkinItem': 'PlayerController.checkinItem',

  'GET /info/:gtin': 'Item_MakeController.productInfo',
  
  'GET /quickCode': 'TestController.quickCode',
  'GET /canary': 'TestController.canary',

  // '/': {
  //   view: 'homepage'
  // }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'GET /app/contacts/:path': 'JadeController.route',
  'GET /jade/:path': 'JadeController.route',
  'GET /contacts.json': 'JadeController.info',
};
