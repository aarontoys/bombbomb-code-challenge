var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var apikey = process.env.SKEY

router.get('/funnyVid/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log('line8: ',apikey);
  var options = {
    uri: 'https://www.googleapis.com/youtube/v3/search',
    qs: {
      part: 'snippet',
      maxResults: 50,
      q: req.params.q || 'funny fail',
      key: apikey,
      videoDuration: 'short',
      type: 'video'
    },
    json: true
  };

  rp(options)
    .then(function (result) {
      res.status(200).json({
        status: 'success',
        myResult: result
      });
      console.log(result);
    })
    .catch(function (error) {
      return next(error);
    })
});

module.exports = router;
