const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Layout = require('express-ejs-layouts');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userModel = require('./module/userModel')
const hotelesRouter = require('./routes/hotelesRoutes');
const ofertasRouter = require('./routes/ofertasRoutes');
const paquetesRouter = require('./routes/paquetesRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"Mi ultra secreto",
  resave:false,
  saveUninitialized:true
}));

app.use((req,res,next)=>{
  if(req.cookies.userId != undefined && req.session.user==undefined){
    let idCookie = req.cookies.userId;
    let user = userModel.getUserById(idCookie);
    req.session.user=user;
    console.log(user);
  }
  next();
})
app.use((req,res,next)=>{
  if(req.session.user!=undefined){
    res.locals.user = req.session.user;
  }
  return next();
});

app.use(Layout)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hoteles', hotelesRouter);
app.use('/ofertas', ofertasRouter);
app.use('/paquetes', paquetesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
