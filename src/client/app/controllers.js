(function () {
  'use strict';

  angular
    .module('bombbomb')
    .controller('youtubeCtrl', youtubeCtrl);

    youtubeCtrl.$inject = ['$window', 'funnyVidService'];

    function youtubeCtrl ($window, funnyVidService) {
      var vm = this;

      funnyVidService.getVideo()
        .then(function (result) {
          var rand = Math.floor(Math.random()*50)
          console.log(rand);
          console.log('result: ', result.data.myResult.items[rand].id.videoId);
          var videoId = result.data.myResult.items[rand].id.videoId;
          vm.title = result.data.myResult.items[rand].snippet.title
          apiReady(videoId);
        })
        var player;
      function apiReady (videoId) {
            // <script>
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        console.log('line33');
        console.log(videoId);
        $window.onYouTubeIframeAPIReady = function () {
          console.log('line35');
          console.log(videoId);
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            // videoId: 'M7lc1UVf-VE',
            videoId: videoId,
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }
      }
      console.log(player);

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      var count = 0;
      function onPlayerStateChange(event) {
        console.log('current time: ', player.getCurrentTime());
        console.log(event);
        console.log(event.data);
        count += event.data;
        console.log('the count is: ',count);
        console.log('current time: ', player.getCurrentTime());
        setTimeout(function () {
          count = 0;
          console.log('timeout reset count is: ', count);
        },1500)
        //   vm.time = 0;
        // clearInterval(vm.myInt);
        // vm.myInt = setInterval(function () {
        //   vm.time++;
        //   console.log(vm.time)
        // },1000);
        // if (event.data == YT.PlayerState.PLAYING && !done) {
        //   setTimeout(stopVideo, 6000);
        //   done = true;
        // }
      }
      function stopVideo() {
        player.stopVideo();
      }
    };

})();