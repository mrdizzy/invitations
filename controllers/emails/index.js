var sendgrid = require('sendgrid')("app7076151@heroku.com", "fbnafrlv8387");

exports.create = function(req, res, next) {
    console.log("GO")
    sendgrid.send({
        to: "david.pettifer@googlemail.com",
        from: "david.pettifer@casamiento.co.uk",
        subject: "Sample request from casamiento.co.uk",
        text: "From: " + req.body.first_name + " " + req.body.last_name + "\n\n" + req.body.message,
    }, function(err, json) {
        if (err) {
            return console.error("Error", err);
        }
        console.log(json)
    })
    res.send(200)
};
