exports.create = function(req, res, next) {

var helper = require('sendgrid').mail;
var from_email = new helper.Email('david@dreamsonpaper.co.uk');
var to_email = new helper.Email(req.body.email);
var subject = 'Thank you for ordering your sample box...';
var content = new helper.Content('text/plain', "Dear " + req.body.name + ",\n\nThank you for requesting a sample pack. It will be sent to you today!");


console.log(from_email, subject, to_email, content)

var mail = new helper.Mail(from_email, subject, to_email, content);

   var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
  if(!error) {
       res.sendStatus(200)
  }
});
};
