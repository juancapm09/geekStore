/**
 * Created by USER
 */

(function(){

    var myApp =  angular.module("GeekStore", []);
    var localCurrency = "COP";

    //controllers
    myApp.controller("ProductsController" , ProductsController);
    ProductsController.$inject = ['$scope' , '$http'];

    function ProductsController($scope, $http) {
        $scope.products = [];
        $scope.invoice = null;
        var URL = "/api/products";

        function addProductToList(currentItem) {
            $scope.products.push({
                name: currentItem.name, quantity: currentItem.quantity,
                value: currentItem.localPrice, id: currentItem.id });
        }

        $http.get(URL).
            success(function(data, status, headers, config) {
                $scope.stock = data;
            }).
            error(function(data, status, headers, config) {
                $scope.message = "Error cargando los articulos";
            });

        $scope.addProduct = function(index){
            var currentItem = $scope.stock[index];

            if (currentItem.quantity === undefined) {
                $scope.message = "No ha seleccionado cantidad de items";
                return;
            } 

            currentItem.localPrice = currentItem.price;

            if (localCurrency === 'H') {
                var URL = "http://www.apilayer.net/api/live?";
                var parameters =
                [
                    "access_key=66386822f3e3769ec263ec3c1e94b51f",
                    "currencies=COP," + currentItem.currency
                ];

                $http.get(URL + parameters.join('&')).
                    success(function(data, status, headers, config) {
                        currentItem.localPrice = 
                            currentItem.price / data.quotes['USD' + currentItem.currency] 
                            * data.quotes['USDCOP'];
                        addProductToList(currentItem);
                    }).
                    error(function(data, status, headers, config) {
                        $scope.message = "Error cargando los articulos";
                    });
            } else {
                addProductToList(currentItem);
            }
        };

        $scope.removeProduct =  function(id){
            for(var i = 0 ;  i < $scope.products.length; i++){
                if(  $scope.products[i].id == id){
                    $scope.products.splice(i, 1);

                    return;
                }
            }
        };

        $scope.buyProducts =  function(){
            var URL = "/api/invoice";
            var jsondata =  {products: $scope.products, clientId: 1};

            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {
                $scope.invoice = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
        };

        $scope.print = function() {
            window.print();
        };
    }
})();