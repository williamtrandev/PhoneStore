const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAPI } = require('../app/middlewares/verifyToken');
const { checkChangePassword } = require('../app/middlewares/changePassword');

const checkoutController = require('../app/controllers/SellingController');
router.get('/', verifyToken, checkChangePassword, checkoutController.homePage);
router.get('/checkout', verifyToken, checkChangePassword, checkoutController.checkoutPage);
router.post('/checkout', checkoutController.checkout);
router.get('/order/:id', checkoutController.detailOrder);
router.get('/order/customerPaging/:id/:page', checkoutController.customerPaging);
router.get('/invoice/:id',  checkoutController.printInvoice);
module.exports = router;