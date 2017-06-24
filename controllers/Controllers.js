/**
 * Created by USER on 13/04/2017.
 */
/**
 * This Controller handles all the requests made to the app and routes them to their specific service
 */

"use strict";

var InvoicesController = require('./InvoicesController');
var ProductsController = require('./ProductsController');

/**
 *Handle all the API requests 
 * @param app
 */
function Controllers(app){
    //TODO
    app.post('/api/invoice', InvoicesController.createInvoice);
    app.get('/api/products', ProductsController.getProducts);
  }

module.exports   =  Controllers;