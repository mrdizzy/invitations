var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var inGroupsOf = require('./../../lib/in_groups_of')

var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.index = function(req, res) {	
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findProducts(db, function(groups) {
	
		res.render('products/index', { products: groups})
  	db.close();
  })
});

}

var findProducts = function(db, callback) {
   var results = db.collection('products').find().toArray(function(err, results) {
	
		var groups = inGroupsOf(results, 3);
		callback(groups)
	 })
		
};	