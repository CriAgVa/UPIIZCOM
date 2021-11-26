(function(){
    function AutoCompleteController($scope) {
      $scope.serachText = '';
      $scope.searchedData = [];
      $scope.canShow = false;
      $scope.searchData = function () {
        if($scope.serachText.trim()){
          $scope.searchedData = $scope.source.filter(function(item){ 
            var isExists = item.toLowerCase().indexOf($scope.serachText.toLowerCase().trim()) >= 0; 
            return isExists;
          });
          
          $scope.canShow = $scope.searchedData.length > 0; 
        } else {
          $scope.canShow = false;
        }
      };
      
      $scope.selectItem = function(item) {
        $scope.selectedText = $scope.serachText = item;
        $scope.canShow = false;
      }
    }
    
    function ACController($scope) {
      $scope.dataSource = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
      $scope.selectedText = '';
    }
    
    angular.module("app", []).controller("ACController", ["$scope", ACController]).directive("autoComplete", function() {
      return {
        restrict: 'E',
        templateUrl: 'autocomplete.html',
        controller: ['$scope', AutoCompleteController],
        scope: {
          source: "=",
          selectedText: '='
        }
      };
    });
  })();