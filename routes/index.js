var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', color: 'blue' });
});

router.get('/pagina', function(req, res, next) {
  res.render('paginax', { title: 'Express', color: 'blue' });
});

router.get('/sidebar', function(req, res, next) {
  res.render('sidebar', { title: 'Express'});
});

router.get('/navbar', function(req, res, next) {
  res.render('navbar', { title: 'Express'});
});

module.exports = router;
