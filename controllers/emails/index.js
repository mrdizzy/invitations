exports.create = function(req, res, next) {

    var helper = require('sendgrid').mail;
    var from_email = new helper.Email('david@dreamsonpaper.co.uk');
    var to_email = new helper.Email(req.body.email);
    var subject = 'Thank you for ordering your sample box...';
    var content = new helper.Content('text/plain', "Dear " + req.body.name + ",\n\nThank you for requesting a sample pack. It will be sent to you today!");



    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    console.log(process.env.SENDGRID_API_KEY)
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
        if (!error) {
            sendAdminEmail();
        }
    });


    function sendAdminEmail() {
        var from_email = new helper.Email('david@dizzy.co.uk');
        var to_email = new helper.Email(req.body.email);
        var subject = 'A sample box request';
        var content = new helper.Content('text/plain', "A samplehas been requested!");



        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        console.log(process.env.SENDGRID_API_KEY)
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            if (!error) {
                res.sendStatus(200)
            }
        });

    }
};
