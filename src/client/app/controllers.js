(function () {
  'use strict';

  angular
    .module('bombbomb')
    .controller('youtubeCtrl', youtubeCtrl);

    youtubeCtrl.$inject = ['$window', 'funnyVidService'];

    function youtubeCtrl ($window, funnyVidService) {
      var vm = this;
      var player;
      var duration = 0;  //move to case1 scope.
      var trackingObj = {};
      var start = 0;  //move to case1 scope.
      var timer;
      var timerArr = [];
      var objTimer;
      var rangeArr = [];
      var rangeStart = 0;
      var rangeArrObjCount = 0;
      var startPoints = [];
      var percentWatched = 0;
      var factor;



      funnyVidService.getVideo()
        .then(function (result) {
          var rand = Math.floor(Math.random()*50)
          var videoId = result.data.myResult.items[rand].id.videoId;
          vm.title = result.data.myResult.items[rand].snippet.title
          apiReady(videoId);
        })
        .catch(function (error) {
          return error;
        })

      function apiReady (videoId) {

        // This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // This function creates an <iframe> (and YouTube player)
        // after the API code downloads.
        $window.onYouTubeIframeAPIReady = function () {
          player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoId,
            // videoId: /*'yQfxab9oMv8',*/ '9lSXhJ2ITQM',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }
      }

      // The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      function rangeArrObj (start, end, count) {
        this.start = start;
        this.end = end;
        this.count = count;
      }

      // The API calls this function when the player's state changes.
      // The function indicates that when playing a video (state=1),
      function onPlayerStateChange(event) {
        // console.log('status code: ', event.data);
        var totalDuration = player.getDuration();
        var increment = parseInt(.1/totalDuration*1000);
        var factor;

        if (totalDuration > 100) {
          factor = 10;
        } else {
          factor = 1;
        }

        switch (event.data) {


          case 1:
            var startFlag = true;
            // var totota
            start = player.getCurrentTime();


            // var bar = document.getElementById("myBar");
            // var width = 0;

            if (!timerArr.length) {

              timer = setInterval(function () {
                duration++;
                // percentWatched = .1/player.getDuration();
                trackingFxn(start, duration/10, totalDuration, increment);
                startFlag = false;

                // console.log('rangeArr: ', rangeArr);

              },100);
              timerArr.push(timer);
            }


            objTimer = setInterval(function () {
              console.log(trackingObj);

                var prevKey;
                var prevKeyVal;




              var whichStart;
              // var case2Start;
              // var case3Start;
              // var case4Start;
              // var case5Start;
              // var prevCase;
              // var case2FirstIteration = true;

              for (var key in trackingObj) {
                // createPatternArr(key, prevKey, whichStart);
                    var keyInt = parseInt(key);

                    if (keyInt === (prevKey + 1) && trackingObj[key] === prevKeyVal) {

                      rangeArr[getIndex(startPoints,whichStart)].end = keyInt;
                      rangeArr[getIndex(startPoints,whichStart)].count = trackingObj[key];

                      if (startPoints.indexOf(keyInt)+1) {
                        rangeArr.splice(startPoints.indexOf(keyInt),1);
                        startPoints.splice(startPoints.indexOf(keyInt),1);
                      }


                    } else if (!checkStartPoints(startPoints, keyInt)) {
                      rangeArr[rangeArr.length] = new rangeArrObj (keyInt, keyInt, trackingObj[key]);
                      startPoints.push(keyInt);
                      whichStart = keyInt;
                    } 
                    else {
                      whichStart = keyInt;
                      rangeArr[getIndex(startPoints,whichStart)].count = trackingObj[key];
                    }

                    prevKey = keyInt;
                    prevKeyVal = trackingObj[key];
                    // prevCase = 1;
                  }

                  var classNameArr = ['a','b','c','d','e'];
                  rangeArr.forEach(function(obj, index) {
                    var width = (obj.end - obj.start + 1)/factor + "%";
                    var leftMargin = obj.start/factor + "%";
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

                // console.log('rangeArr: ', rangeArr);
                // console.log('startPoints: ', startPoints);

            },1000);

            break;
          case 2:


            clearInterval(timer);
            clearInterval(objTimer);
            popArr(timerArr);


            duration = 0;
              // var pauseMarker = document.getElementsByClassName("pause");

          // var margin = (duration/totalDuration*100).toFixed(1);

            percentWatched = 0;

            // pauseCounter++; 


            break;

        case 0: 


            clearInterval(timer);
            clearInterval(objTimer);

            duration = 0;
            percentWatched = 0;

            popArr(timerArr);
            break;
        }

      }

      function popArr (arr) {
        if (arr.length === 1) {
          arr.pop();
        }
      }

      function trackingFxn (start, dur, totalDur, increment) {
          var factor;

          if (totalDur > 100) {
            factor = 1000;
          } else {
            factor = 100;
          }

          var currPercentWatched = parseInt(dur/totalDur*factor);
          var startPercent = parseInt(start/totalDur*factor);
          // percentWatched = increment;
          // if (!increment) {
            if (percentWatched === currPercentWatched) {
            // if (currPercentWatched === percentWatched || currPercentWatched === increment) {
              percentWatched = currPercentWatched + 1;
              if (trackingObj[startPercent + currPercentWatched]) {
                trackingObj[startPercent + currPercentWatched] += 1;
              } else {
                trackingObj[startPercent + currPercentWatched] = 1;
              }
            }
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



      function stopVideo() {
        player.stopVideo();
      }
    };

})();