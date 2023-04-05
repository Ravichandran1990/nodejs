let request = require('request');
let emailController = require('../email/controller');

module.exports.smsApi = (req, res) => {
    let options = { 
        method: 'POST',
        url: 'https://smsapi.edumarcsms.com/api/v1/sendsms',
        headers: 
        {  apikey: 'cjlpehwdd000sgdqunq8agq62',
            'Content-Type': 'application/json' },
        body: 
        { number: [ '886###4970' ],
            message: 'Hello, Thank you for testing Edumarc SMS Services.',
            senderId: 'EDUMRC',
            templateId: '1707161719949940074' 
        },
        json: true 
    };

    const data = request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        //res.status(200).json({success:"ok"});
    });
    //console.log(data);

}