# Geek Store

## Overview

Basic Application to simulate a shopping cart for the store **Geek Store**. The application fulfill 
the following requirements:

1. Products are loaded from the DB. There are currently 6.
1. Products can be added to a cart list, it's possible to select the desired quantity.
1. Selected items are converted to COP$, the conversion rate of the day is used.
1. An invoice is generated with 19% of taxes calculated, the client is able to print a version of
the bill.
1. Users are able to see an historical report of all his purchases.

## Version
0.0.1

## Setup and run

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
[apilayer](https://apilayer.com/). Although, that only allows 1000 requests.
* DB implemented is MongoDB.
* External UI libraries are angularJS and scroll-js.
* Models were implementes with joiJS and mongo-models.