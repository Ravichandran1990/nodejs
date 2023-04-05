const emailController= require('../email/controller');
const smsController= require('../sms/controller');
const cron = require("node-cron");

module.exports.emailsmsApi = async (req,res) => {
    // cron.schedule("*/4 * * * * *", async function () {
    //     console.log("---------------------");
    //     console.log("running a task every 4 seconds" + new Date());
    //     await emailController.sendMail(req,res);
    // });
    
    //await smsController.smsApi(req,res);
    await res.status(200).json({success:"ok1"});
}