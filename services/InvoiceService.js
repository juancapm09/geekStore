/**
 * Created by USER on 13/04/2017.
 */

var db = require('../persistence/config/db');
var Bill = require('../models/Bill');

module.exports.createInvoice = function (req, res) {
    var items = req.body.products;
    var clientId = req.body.clientId;
    var id = Math.round(Math.random() * 10000);

    var newBill = new Bill(id, clientId);
    newBill.createBill(items);

    db.bills.push(newBill);
    res.status(200).jsonp(newBill);
};
