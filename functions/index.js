const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lunchbot.ptml@gmail.com',
        pass: 'Lunchbot0x**'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.body.dest;
        const body = req.body.body;
        const subject = req.body.subject;

        const mailOptions = {
            from: 'Meredith <lunchbot.ptml@gmail.com>', 
            to: dest,
            subject: subject, 
            html: body /*`<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
            <br />
            `*/
        };
  
        res.set("Access-Control-Allow-Origin", "https://lunchbot-e1c26.firebaseapp.com"); 
        res.set("Access-Control-Allow-Methods", "*");
        res.set("Access-Control-Allow-Headers", "Content-Type");

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});
