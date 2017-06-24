/**
 * Created by USER on 14/04/2017.
 */


var productsService = require("../services/ProductsService");

exports.getProducts = function (req, res) {
    productsService.getProducts(req, res);
};
