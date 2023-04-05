const {Router} = require('express');
const authControllers = require('../controllers/authControllers');
const emailControllers = require('../email/controller');
const smsApi = require('../sms/controller');
const emailsmsApi = require('../shared/emailsmscontroller');
const router = Router();
router.post('/signup', authControllers.signup);
router.get('/userlist', authControllers.userlist);
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.get('/verifyuser', authControllers.verifyUser);
router.post('/sendmail', emailControllers.sendMail);
router.post('/smsapi', smsApi.smsApi);
router.post('/emailsmsapi', emailsmsApi.emailsmsApi);

module.exports = router;
