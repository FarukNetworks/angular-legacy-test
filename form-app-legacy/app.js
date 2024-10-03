var app = angular.module('formApp', []);

app.controller('formController', ['$scope', function ($scope) {
    // Initialize with one empty client object, the first one will be the holder
    $scope.clients = [{holder: true}];

    console.log($scope.clients);
    console.log($scope.jsonData);

    // Store the form data in JSON format
    $scope.jsonData = null;

    // Function to add another client form
    $scope.addClient = function () {
        $scope.clients.push({holder: false}); // Add a new empty client object with holder false
    };

    // Function to remove a client form by index
    $scope.removeClient = function (index) {
        if ($scope.clients.length > 1) {
            $scope.clients.splice(index, 1); // Remove client at the given index
            // Automatically set the first form as the holder if no holder is selected
            if (!$scope.clients.some(client => client.holder)) {
                $scope.clients[0].holder = true;
            }
        } else {
            toastr.warning('You must have at least one client form.');
        }
    };

    // Function to ensure only one form can be the "Form Holder"
    $scope.updateFormHolder = function (index) {
        // If the checkbox is selected, uncheck all others
        if ($scope.clients[index].holder) {
            $scope.clients.forEach(function (client, i) {
                if (i !== index) {
                    client.holder = false;
                }
            });
        }
    };

    // Function to handle form submission
    $scope.submitForm = function () {
        // Collect form data in jsonData
        $scope.jsonData = angular.copy($scope.clients); // Make a copy of the clients array
        // You can also handle further submission logic here if needed
        console.log('Form Submitted:', $scope.jsonData);
        toastr.success('Form data submitted!');
    };
}]);
