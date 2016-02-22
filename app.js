var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.post('/temp1',function(req, res){
  //console.log(req);
  //console.log("HEYYY");

  //open different files depending on user input
  console.log(req.body['speaker']);

  var json = '';
  var ret = '';
  var nextSeed = '';
  var allText = '';

  function getRandomSentence(){
    try {
      allText = fs.readFileSync('data/' + req.body['speaker'] + '.txt').toString();
    } catch (e) {
      res.send({S: req.body['speaker'] + " is not debating"});
    }
    var allSen = allText.split(/[.]+/);

    var randInt = Math.floor(Math.random() * allSen.length);
    ret = allSen[randInt];

    if (ret.length < 5) {
      nextSeed = prevWord;
    } else {
      var randInt2 = Math.floor(Math.random() * ret.length);
      //counter to avoid infinite loop in case all words are short
      var counter = 0;
      while (ret[randInt2].length < 4) {
        randInt2 = Math.floor(Math.random() * ret.length);
        if (counter++ > 10) {
          break;
        }
      }
      if (counter > 10) {
        nextSeed = prevWord;
      } else
        nextSeed = ret[randInt2];
    }

    res.send({'S': ret, 'prev': nextSeed});
  }

  if(Math.random() < 0.5 || prevWord == ''){
    getRandomSentence();

  }else {

    try {
      json = fs.readFileSync('data/' + req.body['speaker'] + 'Parsed.txt').toString();
      allText = fs.readFileSync('data/' + req.body['speaker'] + '.txt').toString();
    } catch (e) {
      res.send({S: req.body['speaker'] + " is not debating"});
    }

    var prevWord = req.body['prev'];
    //select random passage from file
    //related to previous word

    var dict = JSON.parse(json);

    //get all sentences
    var allSen = allText.split(/[.]+/);

    //randomly pick a sentence containing prevWord
    if (prevWord in dict) {
      var length = dict[prevWord].length;
      var randInt = Math.floor(Math.random() * length);
      ret = allSen[dict[prevWord][randInt]];

      //randomly select a word from return sentence ret
      //as seed for next argument
      if (ret.length < 5) {
        nextSeed = prevWord;
      } else {
        var randInt2 = Math.floor(Math.random() * ret.length);
        //counter to avoid infinite loop in case all words are short
        var counter = 0;
        while (ret[randInt2].length < 4) {
          randInt2 = Math.floor(Math.random() * ret.length);
          if (counter++ > 10) {
            break;
          }
        }
        if (counter > 10) {
          nextSeed = prevWord;
        } else
          nextSeed = ret[randInt2];
      }
    }

    res.send({'S': ret, 'prev': nextSeed});
  }

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
//  print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
