const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications['apikey'];
apikey.apiKey = "Your Secret Key";
const emailsApi = new ElasticEmail.EmailsApi();
module.exports.sendMail = (req,res) => {
    console.log(req?.body);
    const emailData = {
        Recipients: {
            To: ["virantech112@gmail.com"]
        },
        Content: {
            Body: [
                {
                    ContentType: "HTML",
                    Charset: "utf-8",
                    Content: "Hi you "+ req.body.name
                }
            ],
            From: "frommail",
            Subject: "Example email"
        }
    };
    const campaign = {
        Name: 'hello campaign',
        Recipients: {
            ListNames: ["my list name"],
            SegmentNames: null,
        },
        Content: [{
            From: 'myemail@domain.com',
            ReplyTo: 'myemail@domain.com',
            TemplateName: "hello_template",
            Subject: 'Hello'
        }],
        Status: "Draft"
    };
    const callback = (error, data, response) => {
        if (error) {
            console.error(error);
           // res.status(200).json({success:error});
        } else {
            console.log('API called successfully.');
            console.log('Email sent.');
            //res.status(200).json({success:"done"});
        }
    };
    emailsApi.emailsTransactionalPost(emailData,callback);
    //emailsApi.emailsPost(emailData, callback);    
}