/**
 * Created by USER on 13/04/2017.
 */

var db = require('../persistence/config/db');
var Bill = require('../models/Bill');

module.exports.createInvoice = function (req, res) {
    var items = req.body.products;
    var userName = req.body.userName;
    var id = Math.round(Math.random() * 10000);

    var newBill = new Bill(id, userName);
    newBill.createBill(items);

    db.bills.push(newBill);
    res.status(200).jsonp(newBill);
};

module.exports.getInvoice = function (req, res) {
    var id = Number(req.query.invoiceId);
    var bill = db.bills.find(function(item) {
        return item.id === id;
    });

    res.status(200).jsonp(bill);
};

module.exports.getHistory = function (req, res) {
    res.status(200).jsonp(db.bills);
};
