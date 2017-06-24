/**
 * Created by USER on 13/04/2017.
 */

var db = require('../persistence/config/db');

module.exports.getProducts = function (req, res) {
    res.status(200).jsonp(db.stock);
};
