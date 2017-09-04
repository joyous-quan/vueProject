var express = require('express');

var cors = require('cors');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
//引入
var mongoose = require('mongoose');
//连接地址
const mongoUrl = 'mongodb://localhost:27017/cms';//content manager system
//连接操作
mongoose.connect(mongoUrl,{server:{soketOptions:{ keepAlive: 1 } } });
mongoose.connection.on('error',()=>{
	throw new Error('unable to connect to database');
})


var index = require('./routes/index');
var users = require('./routes/users');
var uploads = require('./routes/uploads');
var cate = require('./routes/cate');
var news = require('./routes/news');
var comment = require('./routes/comment');
var app = express();


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
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(cookieSession({
  name:"sess_id",
  keys:['sion',"cookie"],
  maxAge:60*1000
}));


app.use('/', index);
app.use('/users', users);
app.use('/uploads',uploads);
app.use('/cate',cate);
app.use('/news',news);
app.use('/comment',comment);

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

module.exports = app;
