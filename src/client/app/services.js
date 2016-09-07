(function () {
  'use strict';

  angular
    .module('bombbomb')
    .service('funnyVidService', funnyVidService);
 
    funnyVidService.$inject = ['$http'];

    function funnyVidService ($http) {
      return {
        getVideo: function () {
          return $http.get('/funnyVid/')
            .then(function (res) {
              console.log('res: ', res);
              return res;
            })
            .catch(function (err) {
              console.log('err ', err);
              return err;
            });
        },
      };
    };
})();