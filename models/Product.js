"use strict"

var Joi = require('joi');
var MongoModels = require('mongo-models');

class Product extends MongoModels { }

Product.collection = 'products';

Product.Schema = Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    currency: Joi.string().required()
});

module.exports = Product;