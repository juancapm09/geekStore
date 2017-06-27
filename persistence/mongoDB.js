"use strict"

var mongoClient = require('mongo-models');

module.exports.initMongoDB = function (app) {
    // Connecting to the DB
    mongoClient.connect("mongodb://localhost:27017/localDB", {}, function (err, db) {
        if (err) throw err;
        console.log("DB connection established");

        db.listCollections().toArray(function (err, collections) {
            var clientCollection = collections.find(function (item) {
                if (item.name === "clients")
                    return item;
            });

            // If clients doesn't exist, it creates and populates it
            if (clientCollection === undefined) {
                db.createCollection("clients", function (err, res) {
                    if (err) throw err;

                    var client = {
                        userName: "juan.perez",
                        pass: "juan.perez",
                        bills: []
                    };
                    db.collection("clients").insertOne(client, function (err, res) {
                        if (err) throw err;
                        console.log("Table clients created");
                    });
                });
            }

            var productCollection = collections.find(function (item) {
                if (item.name === "products")
                    return item;
            });

            // If products doesn't exist, it creates and populates it
            if (productCollection === undefined) {
                db.createCollection("products", function (err, res) {
                    if (err) throw err;

                    var products = [{
                            id: '2493701',
                            name: 'Maestro Yoda',
                            price: '75000',
                            currency: 'COP'
                        },
                        {
                            id: '2493702',
                            name: 'Sable laser de plastico',
                            price: '35.00',
                            currency: 'USD'
                        },
                        {
                            id: '2493703',
                            name: 'Nave espacial Halcon Milenario',
                            price: '125000',
                            currency: 'COP'
                        },
                        {
                            id: '2493704',
                            name: 'Estrella de la muerte',
                            price: '200.00',
                            currency: 'USD'
                        },
                        {
                            id: '2493705',
                            name: 'R2D2 en fichas de Lego',
                            price: '450',
                            currency: 'MXN'
                        },
                        {
                            id: '2493706',
                            name: 'Jar Jar Binks Gobernador',
                            price: '800',
                            currency: 'MXN'
                        },
                    ];

                    db.collection("products").insertMany(products, function (err, res) {
                        if (err) throw err;
                        console.log("Table products created");
                    });
                });
            }
        });
    });
};