'use strict'
var express = require('express');
var router = express.Router();
var mcache = require('memory-cache');

//Page cacher 

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if ((process.env.NODE_ENV === 'production') && cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}

/* GET home page. */
router.get('/', cache(10000), require('./../controllers/homepage').index);

router.get('/google', require('./../controllers/homepage').google);
router.get('/sample', require('./../controllers/homepage').sample);

router.post('/emails', require('./../controllers/emails').create);
router.get('/products', cache(10000), require('./../controllers/products').index)
router.get('/products/:id', cache(10000), require('./../controllers/products').show)

module.exports = router;
