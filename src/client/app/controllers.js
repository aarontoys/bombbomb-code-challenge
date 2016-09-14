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
          // console.log(rand);
          // console.log('result: ', result.data.myResult.items[rand].id.videoId);
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
          // console.log('line35');
          // console.log(videoId);
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
      // trackingObj[5] = 7;
      var start = 0;
      var timer;
            var timerArr = [];
      var objTimer;
      var rangeArr = [];
      // var rangeArrObj = {};
      var rangeStart = 0;
      var rangeArrObjCount = 0;
      var startPoints = [];

      function rangeArrObj (start, end, count) {
        this.start = start;
        this.end = end;
        this.count = count;
      }

      function onPlayerStateChange(event) {
        console.log('status code: ', event.data);
        var totalDuration = player.getDuration();

        switch (event.data) {


          case 1:
            start = player.getCurrentTime().toFixed(1);

            // console.log('start: ', Math.floor(player.getCurrentTime()));
            var bar = document.getElementById("myBar");
            var width = 0;
            // var timerRunning = false;
            // console.log(timerArr);
            // console.log(!timerArr.length);
            if (!timerArr.length) {
              // console.log('Interval Starting')
              timer = setInterval(function () {
                duration++;
                width = (duration/totalDuration*10).toFixed(1);
                bar.style.width = width + '%';
                // console.log(duration);
                trackingFxn(start, duration/10, player.getDuration());
                // timerRunning = true;

              },100);
              timerArr.push(timer);
            }

            // var rangeS
            objTimer = setInterval(function () {
              console.log(trackingObj);
              // console.log(Object.keys(trackingObj));
              // console.log(Object.keys(trackingObj).length);
                var prevKey;
                var prevKeyVal;

                // if (!rangeArr.length) {   // if lenght = 0, create new object
                //   rangeArr[rangeArr.length] = new rangeArrObj (Object.keys(trackingObj)[0], Object.keys(trackingObj).length - 1) 
                // } else {  // if lenght != 0, 
                //   rangeArr.forEach(function(obj) {  // check each object of the array
                //     if (obj.start !== Object.keys(trackingObj)[0]) {  // if start != 1st trackingObj key, create new Obj
                //       rangeArr[rangeArr.length] = new rangeArrObj (Object.keys(trackingObj)[0], Object.keys(trackingObj).length - 1) 
                //     } else {
                //       obj.end = Object.keys(trackingObj).length - 1;
                //     }
                //   });
                // }
                // console.log('rangeArr: ', rangeArr);


              var case1Start;
              var case2Start;
              var case3Start;
              var case4Start;
              var case5Start;
              var prevCase;
              var case2FirstIteration = true;

              for (var key in trackingObj) {
                // createPatternArr(key, prevKey, case1Start);
                    var keyInt = parseInt(key);
                // switch (trackingObj[key]) {
                  // case 1:
                    if (keyInt === (prevKey + 1) && trackingObj[key] === prevKeyVal) {
                      // rangeArrObj.end = prevKey
                      // rangeArr[whichIndex-1].end = keyInt;
                      rangeArr[getIndex(startPoints,case1Start)].end = keyInt;
                      rangeArr[getIndex(startPoints,case1Start)].count = trackingObj[key];
                    // } else if (keyInt === (prevKey + 1) && trackingObj[key] <= prevKeyVal) {
                      if (startPoints.indexOf(keyInt)+1) {
                        rangeArr.splice(startPoints.indexOf(keyInt),1);
                        startPoints.splice(startPoints.indexOf(keyInt),1);
                      }


                    } else if (!checkStartPoints(startPoints, keyInt)) {
                      rangeArr[rangeArr.length] = new rangeArrObj (keyInt, keyInt, trackingObj[key]);
                      startPoints.push(keyInt);
                      case1Start = keyInt;
                    } 
                    else {
                      case1Start = keyInt;
                      rangeArr[getIndex(startPoints,case1Start)].count = trackingObj[key];
                    }

                    prevKey = keyInt;
                    prevKeyVal = trackingObj[key];
                    prevCase = 1;
                  }
  //              width = (duration/totalDuration*10).toFixed(1);
  //              bar.style.width = width + '%';
                  // var elements = document.getElementsByClassName('pause');
                  // console.log('elements: ', elements);
                  var classNameArr = ['a','b','c','d','e'];
                  rangeArr.forEach(function(obj, index) {
                    var width = (obj.end - obj.start + 1)/10 + "%";
                    var leftMargin = obj.start/10 + "%";
                    var id = 'id' + index;
                    var colorClass;

                    if (obj.count < 6) {
                     colorClass = classNameArr[obj.count-1];
                    } else {
                      colorClass = classNameArr[4];
                    }
                    

                    if (!index) {
                      var firstDiv = document.getElementById(id);
                      firstDiv.style.width = width
                    } else if (!document.getElementById(id) ){
                      var newDiv = document.createElement('div');
                      var parentNode = document.getElementById('myProgress');
                      newDiv.className = 'viewed ' + colorClass;
                      newDiv.id = id;
                      newDiv.style.width = width;
                      newDiv.style.marginLeft = leftMargin;
                      parentNode.appendChild(newDiv);
                    } else {
                      var existingDiv = document.getElementById(id);
                      existingDiv.className = 'viewed ' + colorClass;
                      existingDiv.style.width = width;
                      existingDiv.style.marginLeft = leftMargin;

                    }

                  });
                    // break;
                  // case 2:

                  //   if (keyInt === (prevKey + 1) && !case2FirstIteration) {
                  //     rangeArr[getIndex(startPoints,case2Start)].end = keyInt;

                  //   } else if (!checkStartPoints(startPoints, keyInt)) {
                  //     rangeArr[rangeArr.length] = new rangeArrObj (keyInt, 2);
                  //     startPoints.push(keyInt)
                  //     case2Start = keyInt;
                  //   } 
                  //   else {
                  //     case2Start = keyInt;
                  //   }

                    // prevKey = keyInt;
                    // case2FirstIteration = false;
                    // } 

                    // if (keyInt === (prevKey + 1)) {
                    //   // rangeArrObj.end = prevKey
                    //   // rangeArr[whichIndex-1].end = keyInt;
                    //   rangeArr[getIndex(startPoints,whichStart)].end = keyInt;
                    // } else if (!checkStartPoints(startPoints, keyInt)) {
                    //   rangeArr[rangeArr.length] = new rangeArrObj (keyInt, 1);
                    //   startPoints.push(keyInt);
                    //   whichStart = keyInt;
                    // } 
                    // else {
                    //   whichStart = keyInt;
                    // }

                    // prevKey = keyInt;
                    // break;
                







                // console.log(key,': ',trackingObj[key]);
                // if (checkStartPoints(startPoints, keyInt) && !rangeArr.length) {
                  // if (!rangeArr.length) {
                    // rangeArr[rangeArrObjCount] = new rangeArrObj (keyInt);
                    // startPoints.push(keyInt)

                  // }
                  // new rangeArrObj (parseInt(key))
                  // rangeArrObj.start = 0;
                // } 






              // }
                console.log('rangeArr: ', rangeArr);
                console.log('startPoints: ', startPoints);

            },1000);
            // console.log('case1',timer);
            // console.log('timerArr: ', timerArr, timerArr.length)
            // start = player.getCurrentTime().toFixed(1);
            break;
          case 2:
            // console.log('start: ', start);
            // console.log('duration ', duration/10);
            // console.log('pause: ', Math.floor(player.getCurrentTime()));
            // console.log('Interval Stopping')
            // console.log('case2',timer);
            // console.log('case 2, timer.length: ', timer.length);
            // console.log('timerArr: ', timerArr, timerArr.length)

            clearInterval(timer);
            clearInterval(objTimer);
            popArr(timerArr);

            // console.log('trackingObj: ', trackingObj);
            duration = 0;
              var pauseMarker = document.getElementsByClassName("pause");
        //   console.log('line101 ', elem);
        //   console.log('line102 ', elem[0]);
          var margin = (duration/totalDuration*100).toFixed(1);
        //   console.log(vm.time);
            percentWatched = 0;
          // pauseMarker[pauseCounter].style.marginLeft = margin + '%';
            pauseCounter++; 
            // console.log('case2 percentWatched: ', percentWatched);

            break;

        case 0: 
            // if (!timerRunning) {
            //   break;
            // }
            // console.log('Interval Stopping')
            // console.log('case0',timer);
            // console.log('case 0, timer.length: ', timer.length);

            clearInterval(timer);
            clearInterval(objTimer);

            duration = 0;
            percentWatched = 0;
            // console.log('trackingObj: ', trackingObj);
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
          // console.log('Timer Array Lenght is > 1!!!!');
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

      function checkStartPoints (arr, val) {
        return arr.some(function (arrVal) {
          return val === arrVal;
        });
      }

      function getIndex (arr, val) {
        return arr.findIndex(function (arrVal) {
          return val === arrVal;
        })
      }

      function createPatternArr (key, prevKey, whichStart) {
                var keyInt = parseInt(key);

                if (keyInt === (prevKey + 1)) {
                  // rangeArrObj.end = prevKey
                  // rangeArr[whichIndex-1].end = keyInt;
                  rangeArr[getIndex(startPoints,whichStart) || 0].end = keyInt;
                } else if (!checkStartPoints(startPoints, keyInt)) {
                  rangeArr[rangeArr.length] = new rangeArrObj (keyInt);
                  startPoints.push(keyInt);
                  whichStart = keyInt;
                } 
                else {
                  whichStart = keyInt;
                }

                prevKey = keyInt;
      }

      function stopVideo() {
        player.stopVideo();
      }
    };

})();