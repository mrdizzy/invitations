exports.create = function(req, res, next) {

    var helper = require('sendgrid').mail;
    var from_email = new helper.Email('david@dreamsonpaper.co.uk');
    var to_email = new helper.Email(req.body.email);

    if (req.body.template == "sample") {
        var subject = 'Your wedding invitation sample box...';
        
        var content_text = new helper.Content("text/plain", "Dear " + req.body.name + "\n\nThank you for requesting a sample, it will be delivered to you in the next 24 hours.")

        var content_html = new helper.Content('text/html', '<html><body style="max-width:600px;margin:0 auto;"> <head> <link href="http://fonts.googleapis.com/css?family=Junge|Playfair+Display+SC|Playfair+Display:400i|Raleway:200,200i,300,300i,400,400i" rel="stylesheet"> </head> <img src="http://invitations-mrdizzy.c9users.io/images/logo/cas_500.png" style="display:block;margin:0 auto;width:150px;padding-top:1em;" /> <div style="border-top:1px solid black;margin-top:1em;padding-bottom:1em;"></div> <img src="http://invitations-mrdizzy.c9users.io/images/logo/dreams_700.png" style="display:block;margin:0 auto;width:150px;" /> <p style="width:97%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;"> Dear David, </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\';padding-top:1em;padding-bottom:1em;"> You\'ll be pleased to know that we\'ve received your request for one of our sample boxes and it will be posted out to you today!</p> <p style="width:80%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;text-align:center;max-width:350px;"> All being well, you should receive it in the next 24 hours. </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\';padding-top:1em;padding-bottom:1em;"> While you\'re waiting for it to arrive, why not save yourself lots of stress by <a href="" style="border:1px dashed black;color:black;text-decoration:none;">downloading</a> our free ebook which contains essential advice on choosing your wedding invitations, whether you decide to buy them from us or from someone else: </p> <img src="http://invitations-mrdizzy.c9users.io/images/email/book.jpg" style="display:block;margin:0 auto;width:300px;padding-top:1em;" /> <div style="width:70%;text-align:center;margin:0 auto;"> <p style="width:80%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;text-align:center;"> ...empower yourself with knowledge by learning from these embarassing invitation horror stories! Discover:</p> <div style="width:70%;text-align:center;margin:0 auto;"> <img src="http://invitations-mrdizzy.c9users.io/images/horror_icons/black-evil-cat.svg" style="margin:0 auto;display:block;width:35px; opacity:0.7" /> <p style="font-family:Raleway;padding-top:1em;padding-bottom:1em;"> <span class="slant">Three important reasons</span> why you must never order your stationery without asking for this first</p> </div> <div style="width:70%;text-align:center;margin:0 auto;"> <img src="http://invitations-mrdizzy.c9users.io//images/horror_icons/creepy-ghost.svg" style="margin:0 auto;display:block;width:35px; opacity:0.7" /> <p style="font-family:Raleway;padding-top:1em;padding-bottom:1em;"> In our online age, <span class="slant">discover the one thing brides aren\'t doing</span> any more when it comes to choosing their invitations and why they are living to regret it</p> </div> <div style="width:70%;text-align:center;margin:0 auto;"> <img src="http://invitations-mrdizzy.c9users.io//images/horror_icons/ghost.svg" style="margin:0 auto;display:block;width:35px; opacity:0.7" /> <p style="font-family:Raleway;padding-top:1em;padding-bottom:1em;"> The one thing no one thinks to ask their stationery company: <span class="slant">this can spoil the most beautiful invitations</span> if you don\'t check first</p> </div> <div style="width:70%;text-align:center;"> <img src="http://invitations-mrdizzy.c9users.io//images/horror_icons/halloween.svg" style="margin:0 auto;display:block;width:35px; opacity:0.7" /> <p style="font-family:Raleway;padding-top:1em;padding-bottom:1em;">What you won\'t know about until your guests tell you: <span class="slant">don\'t hear it from your guests first,</span> avoid this happening to you</p> </div></body></html>');

        var mail = new helper.Mail(from_email, subject, to_email, content_text);
        mail.addContent(content_html)
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        
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
    }
    else if (req.body.template == "download") {
        

    }
};
