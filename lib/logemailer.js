var helper = require('sendgrid').mail;

module.exports = function(page, req) {
    if (!(/Pingdom/.test(req.headers["user-agent"]))) {
        console.log("ORIGINAL URL:-------------------------" + req.originalUrl)
        var from_email = new helper.Email('david@dizzy.co.uk');
        var to_email = new helper.Email('david.pettifer@dizzy.co.uk');
        var subject = req.ip + " has requested a page on casamiento"

        var content = new helper.Content('text/plain', "This page has been hit " + page + "\n\nReferrer:" + req.get("Referer") + "\n\n" + "Browser: " + req.headers["user-agent"]);

        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            console.log(error, response)
        });
    }

}