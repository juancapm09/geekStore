/**
 * Created by USER on 14/04/2017.
 */


var productsService = require("../services/ProductsService");

var ProductsController = (function () {
    var getProducts = function (req, res) {
        productsService.getProducts(req, res);
    };

    return { getProducts };
})();

module.exports = ProductsController;