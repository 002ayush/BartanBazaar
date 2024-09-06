const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);


router.get('/products', shopController.getProducts);
router.post('/products',shopController.getById);


router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.post('/cart',shopController.postCart);
router.get('/checkout', shopController.getCheckout);
router.post('/cart-delete-items',shopController.deleteCartItems);
module.exports = router;
