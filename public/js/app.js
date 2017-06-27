/**
 * Created by USER
 */

(function () {

    var myApp = angular.module("GeekStore", []);
    var localCurrency = "COP";

    //controllers
    myApp.controller("ProductsController", ProductsController);
    ProductsController.$inject = ['$scope', '$http'];

    function ProductsController($scope, $http) {
        $scope.products = [];
        $scope.bills = [];
        $scope.invoice = undefined;
        $scope.newInvoice = true;
        $scope.loggedUser = 'juan.perez';
        $scope.errorMessage = undefined;
        var scroll = new Scroll(document.body);

        // Function Helper
        function addProductToList(currentItem) {
            $scope.products.push({
                name: currentItem.name,
                quantity: currentItem.quantity,
                value: currentItem.localPrice,
                id: currentItem.id
            });
        }

        // Loads all the products from the DB
        var URL = "/api/getProducts";
        $http.get(URL).
        success(function (data, status, headers, config) {
            $scope.stock = data;
        }).
        error(function (data, status, headers, config) {
            $scope.errorMessage = "Error cargando los articulos";
        });

        // Adds an element to the cart (Convert its value to COP)
        $scope.addProduct = function (index) {
            var currentItem = $scope.stock[index];

            if (currentItem.quantity === undefined) {
                $scope.errorMessage = "No ha seleccionado cantidad de items";
                return;
            }

            currentItem.localPrice = currentItem.price;

            if (localCurrency !== currentItem.currency) {
                var URL = "http://www.apilayer.net/api/live?";
                var parameters = [
                    "access_key=66386822f3e3769ec263ec3c1e94b51f",
                    "currencies=COP," + currentItem.currency
                ];

                $http.get(URL + parameters.join('&')).
                success(function (data, status, headers, config) {
                    currentItem.localPrice =
                        currentItem.price / data.quotes['USD' + currentItem.currency] *
                        data.quotes['USDCOP'];
                    addProductToList(currentItem);
                }).
                error(function (data, status, headers, config) {
                    $scope.errorMessage = "Error al convertir a COP$";
                });
            } else {
                addProductToList(currentItem);
            }
        };

        // Removes an element from the list
        $scope.removeProduct = function (id) {
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.products[i].id == id) {
                    $scope.products.splice(i, 1);
                    return;
                }
            }
        };

        // Buys the products in the cart and creates an invoice
        $scope.buyProducts = function () {
            $scope.newInvoice = true;
            var URL = "/api/postInvoice";
            var jsondata = {
                products: $scope.products,
                userName: $scope.loggedUser
            };

            $http.post(URL, jsondata).
            success(function (data, status, headers, config) {
                $scope.invoice = data;
                $scope.products = [];
                document.getElementById("invoice").click();
                var invoiceView = document.getElementById("invoice-div");
                scroll.toElement(invoiceView, { easing: 'easeInOutCubic', duration: 2000 });
            }).
            error(function (data, status, headers, config) {
                $scope.errorMessage = "Error al realizar la compra";
            });
        };

        // Get the history of bills
        $scope.getHistory = function () {
            if (!$scope.newInvoice)
                return;

            var URL = "/api/getHistory?userName=" + $scope.loggedUser;
            $http.get(URL).
            success(function (data, status, headers, config) {
                $scope.bills = data;
                $scope.newInvoice = false;
            }).
            error(function (data, status, headers, config) {
                $scope.errorMessage = "Error cargando el historial de facturas";
            });
        };

        // Requests data for a specific invoice
        $scope.loadInvoice = function (id) {
            if ($scope.invoice !== undefined && $scope.invoice.id === id) {
                document.getElementById("invoice").click();
                return;
            }

            var URL = "/api/getInvoice?userName=" + $scope.loggedUser + "&invoiceId=" + id;
            $http.get(URL).
            success(function (data, status, headers, config) {
                $scope.invoice = data;
                document.getElementById("invoice").click();
            }).
            error(function (data, status, headers, config) {
                $scope.errorMessage = "Error cargando la factura";
            });
        };

        // Handles error message Box
        $scope.closeError = function() {
            $scope.errorMessage = undefined;
        };
    }
})();