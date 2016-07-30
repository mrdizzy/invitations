var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('./../controllers/homepage').index);

router.get('/products', require('./../controllers/products').index)

module.exports = router;
