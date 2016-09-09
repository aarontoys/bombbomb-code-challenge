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
      var countEvents = 0;
      var sumEventData = 0;
      var eventArr = [];
      var duration = 0;
      var pauseCounter = 0;
      var trackingObj = {};
      trackingObj[5] = 7;
      var start = 0;
      var timer;
            var timerArr = [];
      function onPlayerStateChange(event) {
        console.log('status code: ', event.data);
        var totalDuration = player.getDuration();

        switch (event.data) {


          case 1:
            start = player.getCurrentTime().toFixed(1);

            // console.log('start: ', Math.floor(player.getCurrentTime()));
            var bar = document.getElementById("myBar");
            var width = 0;
            var timerRunning = false;
            console.log(timerArr);
            console.log(!timerArr.length);
            if (!timerArr.length) {
              console.log('Interval Starting')
              timer = setInterval(function () {
                duration++;
                width = (duration/totalDuration*100).toFixed(1);
                bar.style.width = width + '%';
                // console.log(duration);
                trackingFxn(start, duration/10, player.getDuration());
                // timerRunning = true;

              },100);
              timerArr.push(timer);
            }
            console.log('case1',timer);
            console.log('timerArr: ', timerArr, timerArr.length)
            // start = player.getCurrentTime().toFixed(1);
            break;
          case 2:
            console.log('start: ', start);
            // console.log('duration ', duration/10);
            // console.log('pause: ', Math.floor(player.getCurrentTime()));
            console.log('Interval Stopping')
            console.log('case2',timer);
            // console.log('case 2, timer.length: ', timer.length);
            console.log('timerArr: ', timerArr, timerArr.length)

            clearInterval(timer);
            popArr(timerArr);

            console.log('trackingObj: ', trackingObj);
            duration = 0;
              var pauseMarker = document.getElementsByClassName("pause");
        //   console.log('line101 ', elem);
        //   console.log('line102 ', elem[0]);
          var margin = (duration/totalDuration*100).toFixed(1);
        //   console.log(vm.time);
            percentWatched = 0;
          // pauseMarker[pauseCounter].style.marginLeft = margin + '%';
            pauseCounter++; 
            console.log('case2 percentWatched: ', percentWatched);

            break;

        case 0: 
            // if (!timerRunning) {
            //   break;
            // }
            console.log('Interval Stopping')
            console.log('case0',timer);
            console.log('case 0, timer.length: ', timer.length);

            clearInterval(timer);
            duration = 0;
            percentWatched = 0;
            console.log('trackingObj: ', trackingObj);
            popArr(timerArr);
            break;
        }
          // countEvents++;
          // sumEventData += event.data;
          // console.log('the count of events is: ',countEvents);
          // console.log('the sum of events is: ',sumEventData);
          // var delayedOutput = '';

          // switch (true) {
          //   case (countEvents === 1 && sumEventData === 1):
          //     console.log('play from pause');
          //     resetCounts();
          //     break;
          //   case (countEvents === 1 && sumEventData === 2):
          //     console.log('pause from play');
          //     // resetCounts();
          //     setTimeout(function () {
          //       countEvents = 0;
          //       sumEventData = 0;
          //       // console.log('timeout count of events is: ', countEvents);
          //       // console.log('timeout sum of event.data is: ', sumEventData);
          //       console.log('fired');
          //     },1500)
          //     break;
          //   case (countEvents === 3 && sumEventData === 3):
          //     console.log('play from page load/refresh');
          //     resetCounts();
          //     break;
          //   case (countEvents === 3 && (sumEventData === 6) ):
          //     console.log('skipping!');
          //     resetCounts();
          //     break;
          //   default:
          //     console.log('what happened???');
          // }

          // function resetCounts () {
          //   countEvents = 0;
          //   sumEventData = 0;
          // }

          // setTimeout (function () {
          //   console.log('line107 ', delayedOutput);
          // },3000);

          // console.log(event.data);
          // console.log('current time: ', player.getCurrentTime());
          // // console.log(event);

          // console.log('total duration: ', player.getDuration());
          // var duration = player.getDuration();
          // // console.log('current time: ', player.getCurrentTime());
          // setTimeout(function () {
          //   countEvents = 0;
          //   sumEventData = 0;
          //   // console.log('timeout count of events is: ', countEvents);
          //   // console.log('timeout sum of event.data is: ', sumEventData);
          // },2000)
          //   vm.time = 0;
          // clearInterval(timer);
          // if (event.data !== 1) {
          //   clearInterval(timer);
          // } else {
          //   var elem = document.getElementById("myBar");
          //   var width = 0;
          //   timer = setInterval(function () {
          //     vm.time++;
          //     console.log(vm.time)
          //     console.log((vm.time/duration*100).toFixed(1));
          //     width = (vm.time/duration*100).toFixed(1);
          //     elem.style.width = width + '%';
          //   },1000);

          // }

          // if (event.data === 2) {
          //   console.log('player paused');
          //   var elem = document.getElementsByClassName("pause");
          //   console.log('line101 ', elem);
          //   console.log('line102 ', elem[0]);
          //   var margin = (vm.time/duration*100).toFixed(1);
          //   console.log(vm.time);
          //   elem[0].style.marginLeft = margin + '%';
          // }
          // // if (event.data == YT.PlayerState.PLAYING && !done) {
          // //   setTimeout(stopVideo, 6000);
          // //   done = true;
          // // }
      }

      function popArr (arr) {
        if (arr.length === 1) {
          arr.pop();
        } else {
          console.log('Timer Array Lenght is > 1!!!!');
        }
      }

          var percentWatched = 0;
      function trackingFxn (start, dur, totalDur) {
        // console.log('start: ', start, ', duration: ', dur, ', totalDur: ', totalDur, ', start %: ', parseInt(start/totalDur*1000), ', end %: ', parseInt(dur/totalDur*1000));
        // console.log('line200: ', parseInt(dur/totalDur*1000));
        // console.log('percentWatched: ', percentWatched);
          if (parseInt(dur/totalDur*1000) == percentWatched) {
            percentWatched = parseInt(dur/totalDur*1000) + 1;
            // console.log('percentWatched: ', percentWatched);
            if (trackingObj[parseInt((start/totalDur + dur/totalDur)*1000)]) {
              // console.log('duplicate');
              trackingObj[parseInt((start/totalDur + dur/totalDur)*1000)]+= 1;
            } else {
              // console.log('non duplicate');
              trackingObj[parseInt((start/totalDur + dur/totalDur)*1000)] = 1;
            }

          }
          // console.log(percentWatched);
      }
      function stopVideo() {
        player.stopVideo();
      }
    };

})();