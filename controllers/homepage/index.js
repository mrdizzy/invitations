var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.index = function(req, res) {
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findProducts(db, function(results) {
		res.render('index', { products: results})
  	db.close();
  })
});
}

var findProducts = function(db, callback) {
   var results = db.collection('products').find().limit(6).sort({"position": -1}).toArray(function(err, results) {
		callback(results)
	 })

};
