const controller = {
    index: function (req, res, next) {
      if(req.session.user!=undefined){
        res.render('index',{ title: ' Layouts',error:''})
      }else{
      res.render('index', { title: 'Layouts',error:'' });
    }
    },
    us: function (req, res, next) {
      res.locals.user = { name: "Fernanda" }
      res.render('index', { title: 'Nosotros' });
    },
    contact: function (req, res, next) {
      res.locals.user = { name: "Fernanda" }
      res.render('index', { title: 'Contacto' });
    }
  }
  module.exports = controller