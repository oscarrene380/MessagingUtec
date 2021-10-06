const express = require('express');
const router = express.Router();
const { promisify } = require('util');

const accountSid = 'AC88b60fb0299b546e98aaed47e23ba6a4'; 
const authToken = '60818428084137ce75dcbf27fe0126c4'; 
const client = require('twilio')(accountSid, authToken); 

router.post('/send', async (req, res) => {
    const { phone, message } = req.body;
    //client.messages.create = promisify(client.messages.create);
    let send = await client.messages .create({ 
        body: message,  
        messagingServiceSid: 'MG0906845bc26304d670dc941f22384c92',      
        to: phone 
    });

    if(send.status == 'accepted'){
        
        res.redirect('/home/success/¡Mensaje enviado correctamente!');
    }
    else
    {
        res.redirect('/home/error/¡Error enviando mensaje, pruebe de nuevo y verifique los campos!');
    }
});

module.exports = router;