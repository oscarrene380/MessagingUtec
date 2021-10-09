const express = require('express');
const router = express.Router();

const accountSid = 'AC88b60fb0299b546e98aaed47e23ba6a4'; 
const authToken = 'ca10298626e582d40f02bb88545fabb6'; 
const client = require('twilio')(accountSid, authToken); 

router.post('/send', (req, res) => {
    const { phone, message } = req.body;
    client.messages.create({
        body: message,  
        messagingServiceSid: 'MG0906845bc26304d670dc941f22384c92',
        statusCallback: 'https://messagingutec.herokuapp.com/status',
        to: phone 
    })
    .then((message) => {
        //console.log(message)
        if(message.status == 'accepted')
            res.redirect('/home/success/¡Mensaje enviado correctamente!');
        else
            res.redirect('/home/error/¡Error enviando mensaje, pruebe de nuevo y verifique los campos!');
    })
    .catch((err) => {
        res.redirect('/home/error/'+err.message);
    })
    .done();
});


router.post('/status', (req, res) => {
    console.log(req.body);
});

module.exports = router;