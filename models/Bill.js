"use strict"
var Joi = require('joi');

var Bill = function (id) {
    this.id = id;
    this.date = new Date().toLocaleDateString();
    this.purchase = 0;
    this.tax = 0;
    this.total = 0;
    this.items = [];
}

Bill.prototype.createBill = function (products) {
    for (var i = 0; i < products.length; i++) {
        var item = products[i];
        var totalPrice = Number(item.value) * item.quantity;
        this.items.push({
            productId: item.id,
            name: item.name,
            value: totalPrice * 0.81,
            qty: item.quantity,
            tax: totalPrice * 0.19
        });

        this.purchase += totalPrice * 0.81;
        this.tax += totalPrice * 0.19;
        this.total += totalPrice;
    }
};

Bill.Schema = Joi.object({
    id: Joi.string().required(),
    date: Joi.date().required(),
    purchase: Joi.number(),
    tax: Joi.number(),
    total: Joi.number(),
    items: Joi.array().items({})
});

module.exports = Bill;