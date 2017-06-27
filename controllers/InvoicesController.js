/**
 * Created by USER on 14/04/2017.
 */

var invoiceService = require("../services/InvoiceService");

var InvoicesController = (function () {
    var createInvoice = function (req, res) {
        invoiceService.createInvoice(req, res);
    };

    var getInvoice = function (req, res) {
        invoiceService.getInvoice(req, res);
    };

    var getHistory = function (req, res) {
        invoiceService.getHistory(req, res);
    };

    return { createInvoice, getInvoice, getHistory };
})();

module.exports = InvoicesController;