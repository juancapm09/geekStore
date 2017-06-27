"use strict"

var Joi = require('joi');
var MongoModels = require('mongo-models');
var Bill = require('./Bill');

class Client extends MongoModels { }

Client.collection = 'clients';

Client.Schema = Joi.object().keys({
    userName: Joi.string().required(),
    pass: Joi.string().required(),
    bills: Joi.array().items(Bill.Schema)
});

module.exports = Client;