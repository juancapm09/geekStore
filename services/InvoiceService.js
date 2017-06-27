/**
 * Created by USER on 13/04/2017.
 */

var Client = require('../models/Client');
var Bill = require('../models/Bill');

var invoceService = (function () {
    // Adds an invoice to the client
    var createInvoice = function (req, res) {
        var filter = {
            userName: req.body.userName
        };
        var items = req.body.products;
        var id = Math.round(Math.random() * 10000);
        var newBill = new Bill(id.toString());

        newBill.createBill(items);
        Client.updateOne(filter, {
            $push: {
                bills: newBill
            }
        }, function (err, result) {
            if (err) {
                res.status(500).jsonp({
                    message: "Error generando la factura"
                });
                return;
            }

            res.status(200).jsonp(newBill);
        });
    };

    // Gets the full invoice info
    var getInvoice = function (req, res) {
        var filter = {
            userName: req.query.userName
        };

        Client.findOne(filter, { bills: { $elemMatch: { id: req.query.invoiceId }}},
        function (err, client) {
            if (err) {
                res.status(500).jsonp({
                    message: "Error cargando los productos"
                });
                return;
            }

            if(client.bills.length === 0)
                res.status(404).jsonp({ message: "Factura no ha sido encontrada" });
            else
                res.status(200).jsonp(client.bills[0]);
        });
    };

    // Gets the history of all the purchases
    var getHistory = function (req, res) {
        var filter = {
            userName: req.query.userName
        };

        // items are not being included when retrieving the history, as that could be heavy
        Client.findOne(filter, { 'bills.items': 0 }, function (err, client) {
            if (err) {
                res.status(500).jsonp({
                    message: "Error cargando los productos"
                });
                return;
            }

            res.status(200).jsonp(client.bills);
        });
    };

    return {
        createInvoice,
        getInvoice,
        getHistory
    };
})();

module.exports = invoceService;