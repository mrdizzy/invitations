var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var counter = 0;
var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.index = function(req, res) {
            var helper = require('sendgrid').mail;
        var from_email = new helper.Email('david@dizzy.co.uk');
        var to_email = new helper.Email('david.pettifer@dizzy.co.uk');
        var subject = 'Homepage has been hit!';
        var details =  req.headers["user-agent"] 
     
        var content = new helper.Content('text/plain', "Homepage has been hit\n" + req.get("Referer") + "\n" +  details);

        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            if (!error) {
            }
        });
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
            res.render('index_a', { products: results, page: "index_a", sample: cookie })
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
