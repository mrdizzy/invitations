var helper = require('sendgrid').mail;
var from_email = new helper.Email('david@dreamson.paper.co.uk');
var to_email = new helper.Email('test@example.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env["J_6DQkSDQVuphBeli5JuMw.zl1n29y3UaDjZzTqJYNppxZ3if9w_enZ"]);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

exports.create = function(req, res, next) {
    
sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
});


//    console.log("Sending email" + req.body)
//    sendgrid.send({
//        to: "david.pettifer@googlemail.com",
//        from: "david.pettifer@casamiento.co.uk",
//        subject: "Sample request from casamiento.co.uk",
//        text: "From: " + req.body.first_name + " " + req.body.last_name + "\n\n" + req.body.message
//    }, function(err, json) {
//        if (err) {
//            console.log("THere was an error" + err)
//            return console.error("Error", err);
//        }
//        console.log("No erro, " + json)
//    })
//    console.log("Sent")
//    res.send(200)
};
