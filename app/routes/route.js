exports.setRoutes = function(app) {
  app.use('/', require('./routers/index'));
  app.use('/register', require('./routers/register'));
  app.use('/logic-puzzle', require('./routers/logic-puzzle'));
  app.use('/login', require('./routers/login'));
  app.use('/user-puzzle',require('./routers/user-puzzle'));
  app.use('/start', require('./routers/start'));
  app.use('/user-detail', require('./routers/user-detail'));
};