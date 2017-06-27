/**
 * Created by USER on 13/04/2017.
 */

var Product = require('../models/Product');

var productService = (function () {
    // Gets the list of available products
    var getProducts = function (req, res) {
        Product.find({}, function (err, products) {
            if (err) {
                res.staus(500).jsonp({
                    message: "Error cargando los productos"
                });
                return;
            }

            res.status(200).jsonp(products);
        });
    };

    return { getProducts };
})();

module.exports = productService;