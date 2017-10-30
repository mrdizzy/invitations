var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('./../controllers/homepage').index);

router.get('/google', require('./../controllers/homepage').google);
router.get('/sample', require('./../controllers/homepage').sample);

router.post('/emails', require('./../controllers/emails').create);
router.get('/products', require('./../controllers/products').index)
router.get('/products/:id', require('./../controllers/products').show)

module.exports = router;
