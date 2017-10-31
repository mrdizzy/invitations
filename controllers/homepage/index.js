var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var emaillog =  require('./../../lib/logemailer')
var counter = 0;
var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.index = function(req, res) {
    emaillog("Standard Homepage " + req.query.sample, req)  
    var cookie = req.cookies.sample_request;

    if ((cookie === undefined) && req.query.sample) {
        // no: set a new cookie
        res.cookie('sample_request', req.query.sample / 100, { maxAge: 900000 });
        cookie = req.query.sample / 100
    }
    MongoClient.connect(url, function(err, db) {

        assert.equal(null, err);
        findProducts(db, function(results) {
            // if(counter == 0) {
            res.render('index', { products: results, page: "index", sample: cookie })
            //	counter = 1;
            //  } else {
            //	res.render('index_b', { products: results, page: "index_b", sample:cookie})
            //		counter = 0;
            //   }
            db.close();
        })
    });
}

exports.google = function(req, res) {
      
    emaillog("Google Homepage " + req.query.sample, req)  
    var cookie = req.cookies.sample_request;

    if ((cookie === undefined) && req.query.sample) {
        // no: set a new cookie
        res.cookie('sample_request', req.query.sample / 100, { maxAge: 900000 });
        cookie = req.query.sample / 100
    }
    MongoClient.connect(url, function(err, db) {

        assert.equal(null, err);
        findProducts(db, function(results) {
            // if(counter == 0) {
            res.render('index_z', { products: results, page: "index_z", sample: cookie })
            //	counter = 1;
            //  } else {
            //	res.render('index_b', { products: results, page: "index_b", sample:cookie})
            //		counter = 0;
            //   }
            db.close();
        })
    });
}



exports.sample = function(req, res) {
    
    
    emaillog("Sample request page " + req.query.sample, req)  
    var cookie = req.cookies.sample_request;

    if ((cookie === undefined) && req.query.sample) {
        // no: set a new cookie
        res.cookie('sample_request', req.query.sample / 100, { maxAge: 900000 });
        cookie = req.query.sample / 100
    }
    MongoClient.connect(url, function(err, db) {

        assert.equal(null, err);
        findProducts(db, function(results) {
            // if(counter == 0) {
            res.render('sample', { products: results, page: "sample", sample: cookie })
            //	counter = 1;
            //  } else {
            //	res.render('index_b', { products: results, page: "index_b", sample:cookie})
            //		counter = 0;
            //   }
            db.close();
        })
    });
}

var findProducts = function(db, callback) {
    var results = db.collection('products').find().sort({ "position": -1 }).toArray(function(err, results) {
        callback(results)
    })

};
