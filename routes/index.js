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
router.get('/home', cache(10000), require('./../controllers/homepage').index);
router.get('/', cache(10000), require('./../controllers/homepage').silver);
router.get('/silver', cache(10000), require('./../controllers/homepage').silver);
router.get('/google', require('./../controllers/homepage').google);
router.get('/wedding-invitation-horror-stories',  function(req,res) {res.render('horror')})

router.post('/emails', require('./../controllers/emails').create);
router.get('/wedding-invitations', cache(10000), require('./../controllers/products').index)
router.get('/wedding-invitations/:id', cache(10000), require('./../controllers/products').show)

module.exports = router;
