# Geek Store

Geek store documentation

## Overview

Basic Application to simulate a shopping cart for the store **Geek Store**. The application fulfills 
the following requirements:

1. Products are loaded from the DB. There are currently 6.
1. Products can be added to a cart list, it's possible to select the desired quantity.
1. Selected items value is converted to COP$, the conversion rate of the day is used.
1. An invoice is generated with 19% of taxes calculated, the client is able to print a version of
the bill.
1. Users are able to see an historical report of all his purchases.

## Version
0.0.1

## Setup and run

Instructions to set up the project and run it.

###DB

The MongoDB service was used to store the information related to this project. In order to 
successfully run it, you must install and run the mongo service. Check 
[MongoDB](https://docs.mongodb.com/) for further info.

* **Note:** The basic information to run the application is set once the servers of the APP and DB 
are established.

### Server
Download the project and run

```javascript
npm install
npm start
```

## Notes
* The currency conversion is being done thanks to a free services provided by 
[apilayer](https://apilayer.com/). Although, that only allows 1000 requests and the source currency
used is _USD_.
* The conversion depends on the currency code used, it must be the standard one. Currently items in
DB are in COP, USD and MXN. _if a new one is added, the code should be the standard_
* DB implemented is MongoDB.
* External UI libraries are angularJS and scroll-js.
* Models were implementes with joiJS and mongo-models.