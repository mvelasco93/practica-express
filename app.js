var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var interactjs = require('interactjs');

var index = require('./routes/index');
var users = require('./routes/users');
var proyectos = require('./routes/proyectos');
var tareas = require('./routes/tareas');


var app = express();
var browserify = require('browserify');
var http = require('http');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/bower_components'));

app.use('/', index);
app.use('/users', users);
app.use('/proyectos', proyectos);
app.use('/tareas', tareas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


http.createServer(function (req, res) {
    if (req.url === '../public/js/script.js') {
        res.setHeader('content-type', 'application/javascript');
        var b = browserify(__dirname + '../public/js/script.js').bundle();
        b.on('error', console.error);
        b.pipe(res);
    }
    else res.writeHead(404, 'not found')
});

module.exports = app;