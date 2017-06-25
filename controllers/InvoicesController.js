/**
 * Created by USER on 14/04/2017.
 */

var invoiceService = require("../services/InvoiceService");

exports.createInvoice = function (req, res) {
    invoiceService.createInvoice(req, res);
};

exports.getInvoice = function (req, res) {
    invoiceService.getInvoice(req, res);
};

exports.getHistory = function (req, res) {
    invoiceService.getHistory(req, res);
};
