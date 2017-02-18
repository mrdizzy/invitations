
exports.create = function(req, res, next) {

var helper = require('sendgrid').mail;
var mail = new helper.Mail(from_email, subject, to_email, content);

var from_email = new helper.Email('david@dreamsonpaper.co.uk');
var to_email = new helper.Email(req.body.email);
var subject = 'Thank you for ordering your sample box...';
var content = new helper.Content('text/plain', "Dear " + req.body.name + ",\n\nThank you for requesting a sample pack. It will be sent to you today!");

   var sg = require('sendgrid')("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");
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log(response.body);
  console.log(response.headers);
  unless(error) {
       res.send(200)
  }
});
};
