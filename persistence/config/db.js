/**
 * Created by USER on 13/04/2017.
 */

var Product = require('../../models/Product');
var Client = require('../../models/Client');

var db = (function() {
    var stock = [];
    var bills = [];
    var clients = [];

    (function() {
        stock.push(new Product(1, 'Maestro Yoda', '75000', 'COP'));
        stock.push(new Product(2, 'Sable laser de plastico', '35.00', 'USD'));
        stock.push(new Product(3, 'Nave espacial Halcon Milenario', '125000', 'COP'));
        stock.push(new Product(4, 'Estrella de la muerte', '200.00', 'USD'));
        stock.push(new Product(5, 'R2D2 en fichas de Lego', '450', 'MXN'));
        stock.push(new Product(6, 'Jar Jar Binks Gobernador', '800', 'MXN'));
    })();

    (function() {
        clients.push(new Client(1, 'juan.perez', 'juan.perez'));
    })();

    return { stock, bills, clients };
})();

module.exports = db;