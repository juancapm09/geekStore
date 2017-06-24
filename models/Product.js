"use strict"

function Product (id, name, price, currency) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
}

module.exports = Product;