(function () {
  'use strict';

  angular
    .module('bombbomb')
    .directive('youtube', youtube);

    function youtube () {
      return {
        restrict: 'EA',
        templateUrl: 'app/view.html',
        controller: 'youtubeCtrl',
        controllerAs: 'vm'
      };
    };

})();