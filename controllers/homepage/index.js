var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var counter = 0;
var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.index = function(req, res) {
 var cookie = req.cookies.sample_request;
  if ((cookie === undefined) && req.query.sample)
  {
    // no: set a new cookie
    res.cookie('sample_request', req.query.sample, { maxAge: 900000 });
    cookie = req.query.sample
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
MongoClient.connect(url, function(err, db) {
    
  assert.equal(null, err);
  findProducts(db, function(results) {
      console.log(counter)
   // if(counter == 0) {
	res.render('index_a', { products: results, page: "sample_form_top", sample: cookie})
	//	counter = 1;
    //  } else {
//	res.render('index_b', { products: results, page: "sample_form_bottom"})
//		counter = 0;
   //   }
  	db.close();
  })
});
}

var findProducts = function(db, callback) {
   var results = db.collection('products').find().sort({"position": -1}).toArray(function(err, results) {
		callback(results)
	 })

};
