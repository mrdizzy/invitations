var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://heroku_7jbfrvs8:76hige1vltbholks0vdnmmpdpo@ds031925.mlab.com:31925/heroku_7jbfrvs8';

exports.create = function(req, res, next) {


    if (req.body.type == "PayPal") {
        MongoClient.connect(url, function(err, db) {

            var sample_requests = db.collection("sample_requests");


            sample_requests.insert({
                name: "The PayPal button has been clicked!"
            }, function(err, result) {
                console.log(err, result)

                db.close();
            })
        });

        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('david@dizzy.co.uk');
        var to_email = new helper.Email('david.pettifer@dizzy.co.uk');
        var subject = 'A sample box request from PayPal';
        var content = new helper.Content('text/plain', "PayPal butto has been pressed");

        var mail = new helper.Mail(from_email, subject, to_email, content);

            console.log("Processing the email")
            
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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
    else {
        MongoClient.connect(url, function(err, db) {

            var sample_requests = db.collection("sample_requests");


            sample_requests.insert({
                name: req.body.name,
                email: req.body.email,
                page: req.body.page,
                guests: req.body.guests,
                referer: req.headers.referer,
                address: req.body.address,
                postcode: req.body.postcode,
                sample: req.body.sample,
                date: new Date().toDateString()
            }, function(err, result) {
                console.log(err, result)

                db.close();
            })
        });

        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('david@dreamsonpaper.co.uk');
        var to_email = new helper.Email(req.body.email);
        if (req.body.template == "sample") {
            var subject = 'Your wedding invitation sample box...';

            var content_text = new helper.Content("text/plain", "Dear " + req.body.name + "\n\nThank you for requesting a sample, it will be delivered to you in the next 24 hours.")

            var content_html = new helper.Content('text/html', '<html><body style="max-width:600px;margin:0 auto;"> <head> <link href="http://fonts.googleapis.com/css?family=Junge|Playfair+Display+SC|Playfair+Display:400i|Raleway:200,200i,300,300i,400,400i" rel="stylesheet"> </head> <img src="http://www.casamiento.co.uk/images/logo/cas_500.png" style="display:block;margin:0 auto;width:150px;padding-top:1em;" /> <div style="border-top:1px dotted black;margin-top:1em;padding-bottom:1em;"></div> <img src="http://www.casamiento.co.uk/images/logo/dreams_700.png" style="display:block;margin:0 auto;width:150px;" /> <p style="width:97%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;">' + req.body.name.split(" ")[0] + ', </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;"> You\'ll be pleased to know that I\'ve received your request for one of our sample boxes and it will be posted out to you today!</p> <img src="http://www.casamiento.co.uk/images/product/samplebox.png" style="width:95%;padding-top:2em;max-width:250px;display:block;margin: 0 auto;" /> <p style="width:80%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;text-align:center;max-width:350px;line-height:1.2em;"> Choosing and ordering your invitations can be a daunting process...</p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">There\'s the wording, the cost, the guest list, and a lot of other things that can go wrong. When the final package arrives, most people have a sense of trepidation as well as excitement as they open it:</p> <p style="width:80%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;text-align:center;max-width:350px;line-height:1.2em;">it all boils down to this: will it be what I expected? </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">That\'s why ordering samples first is so important: things can look very different in a photograph:</p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">you can\'t feel the quality of the card, colours look different, the printing isn\'t obvious, and even worse, a lot of companies use computer-rendered images rather than real photographs of their stationery which means the images you see are just a superimposed representation rather than a real photograph.</p> <p style="width:80%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;text-align:center;max-width:350px;line-height:1.2em;">You\'ve already made the right first step: ordering a sample allows you to see exactly what you\'re going to get. </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">And one of the things I always strongly recommend, to all my clients, is that they when I\'ve finished creating their invitation suite and it\'s time to print, is that I send them a single printed "proof" before they sign off the entire order. And "proof" is the wrong word really:</p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">Often a printed proof is still not the same as the real thing: companies will use a different printer or different card, but when I send out a proof it\'s the REAL thing: the ribbon, the card, the tissue paper... what you see is what you\'ll get in the final order.</p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">So if something isn\'t how you like it, you can get it changed before any damage is done, and you\'ll be confident that when that package arrives, it\'s going to contain exactly what you expected: no unpleasant surprises. </p> <p style="width:80%;margin:0 auto;font-family:\'Junge\',serif;padding-top:1em;padding-bottom:1em;font-size:1.4em;text-align:center;max-width:350px;line-height:1.2em;">As Alexander Graham Bell said, "Before anything else, preparation is the key to success." </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">There\'s only one chance to get it right. You won\'t be ordering wedding invitations again. </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">And you probably don\'t know all the things to think about. So in a few days I\'ll email you with some really helpful advice that will save you time, money and stress. </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">in the meantime if you have any questions, don\'t think twice about contacting me.</p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">I hope you enjoy receiving the sample box, and the little surprise inside. </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;"> Thanks again, and if there\'s anything I can do for you, any questions I can answer, don\'t think twice before getting in touch with me...</p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;">My kindest regards, </p> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;"> <p style="width:97%;margin:0 auto;font-family:\'Raleway\',sans-serif;padding-top:1em;padding-bottom:1em;line-height:1.4em;"> <img src="http://www.casamiento.co.uk/images/email/sig.png" style="width:100px;" /> </p> <img src="http://www.casamiento.co.uk/images/email/davidphoto.jpg" style="display:block;margin:0 auto;width:50%;padding-top:0.8em;max-width:250px;" /> <div style="width:48%;float:left;text-align:right;"><p style="font-family:\'Raleway\';font-size:1em;padding-top:1em;;margin:0;"><a href="" style="border-bottom:1px dotted black;text-decoration:none;color:black;">david@casamiento.co.uk</a></p> <p style="font-family:\'Raleway\';font-size:1em;padding:0;margin:0">01983 522915</p></div> <div style="width:48%;float:right;"><p style="font-family:\'Playfair Display SC\';letter-spacing:0.1em;font-size:1.5em;">David Sotiropoulos</p></div></body></html>');

        //   var mail = new helper.Mail(from_email, subject, to_email, content_text);
        //   mail.addContent(content_html)
        //   var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

        //   var request = sg.emptyRequest({
        //       method: 'POST',
        //       path: '/v3/mail/send',
        //       body: mail.toJSON(),
        //   });

        //    sg.API(request, function(error, response) {
        //        if (!error) {
        //            sendAdminEmail();
        //        }
        //    });

                        res.sendStatus(200)

            function sendAdminEmail() {
                var from_email = new helper.Email('david@dizzy.co.uk');
                var to_email = new helper.Email('david.pettifer@dizzy.co.uk');
                var subject = 'A sample box request';
                var content = new helper.Content('text/plain', "A sample has been requested!\n\n" + req.body.page + "\n\n " + req.headers.referer + "\n\n " + req.body.name + "\n\n " + req.body.address + "\n\n " + req.body.sample + "\n\n " + req.body.email + "\n\n " + req.body.postcode);

                var mail = new helper.Mail(from_email, subject, to_email, content);

                var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
                var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON(),
                });

                sg.API(request, function(error, response) {
                    console.log(error, response)
                    if (!error) {
                        res.sendStatus(200)
                    }
                });
            }
        }
        else if (req.body.template == "download") {

        }
    }
}
