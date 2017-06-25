"use strict"

function Bill (id, userName) {
    this.id = id;
    this.userName = userName;
    this.items = [];
    this.tax = 0;
    this.purchase = 0;
    this.total = 0;
    this.date = new Date().toDateString();
}

Bill.prototype.createBill = function (products) {
    for(var i = 0; i < products.length; i++) {
        var item = products[i];
        var totalPrice = Number(item.value) * item.quantity;
        this.items.push({ 
            productId: item.id, name: item.name, value: totalPrice * 0.81,
            qty: item.quantity, tax: totalPrice * 0.19 });

        this.purchase += totalPrice * 0.81;
        this.tax += totalPrice * 0.19;
        this.total += totalPrice;
    }
}

module.exports = Bill;