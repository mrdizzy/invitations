var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var inGroupsOf = require('./../../lib/in_groups_of')
var fs = require('fs');
var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.index = function(req, res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findProducts(db, function(groups) {

            res.render('products/index', { products: groups })
            db.close();
        })
    });

}

exports.show = function(req, res) {
    var cookie = req.cookies.sample_request;

    if ((cookie === undefined) && req.query.sample) {
        // no: set a new cookie
        res.cookie('sample_request', req.query.sample / 100, { maxAge: 900000 });
        cookie = req.query.sample / 100
    }



    var id = req.params.id;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findProduct(db, id, function(results) {
            var product = results[0].name
            var path = "public/images/invitations/" + product
            var images = ["collage", "box_envelope_angle", "boxenvelope_invitefront", "flat_angle_ribbon", "wrap", "info", "flat_wording_overhead", "seals", "wraps", "flat_ribbon", "map", "foldout","boxenvelope_overhead", "rsvp", "boxenvelope_tissue", "boxenvelope_vellum"];
            var existing_images = []
            images.forEach(function(img) {
                if (fs.existsSync(__dirname + "/../../" + path + "/" + img + "_2000.jpg")) {
                    existing_images.push(img)
                }
            })
            
            
             if (fs.existsSync(__dirname + "/../../" + path + "/high.mp4")) {
                    results[0].video = true
                }
            results[0].existing_images = existing_images
            res.render('products/show', { product: results[0], sample: cookie })
            db.close();
        })
    });
}


var findProduct = function(db, id, callback) {
    var results = db.collection('products').find({ "name": id }).toArray(function(err, results) {

        callback(results)
    })


}
var findProducts = function(db, callback) {
    var results = db.collection('products').find().toArray(function(err, results) {

        var groups = inGroupsOf(results, 3);
        callback(groups)
    })

};
