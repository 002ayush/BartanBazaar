const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/product-list", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/index", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	});
};
exports.getById = (req, res, next) => {
	const id = req.body.prod_details;

	Product.fetchById(id, (product) => {
		res.render("shop/product-detail.ejs", {
			pageTitle: product.title,
			path: "/products",
			product: product,
		});
	});
};
exports.getCart = (req, res, next) => {
	Cart.getCarts((cart) => {
		if (cart) {
			Product.fetchAll((products) => {
				let cartProducts = [];
				for (product of products) {
					const cartProduct = cart.product.find((p) => p.id === product.id);
					if (cartProduct) {
						cartProducts.push({
							cartProduct: cartProduct,
							CartAllProducts: product,
						});
					}
				}
				res.render("shop/cart", {
					path: "/cart",
					pageTitle: "Your Cart",
					cartProducts: cartProducts,
				});
			});
		}
	});

}


exports.getOrders = (req, res, next) => {
	res.render("shop/orders", {
		path: "/orders",
		pageTitle: "Your Orders",
	});
};
exports.postCart = (req, res, next) => {
	const cart_Id = req.body.cartId;
	Product.fetchById(cart_Id, (product) => {
		Cart.addCart(cart_Id, product.price);
		res.redirect("/cart");
	});
};
exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};

exports.deleteCartItems = (req, res, next) => {
  const cartItemId = req.body.cartItems;
  Product.fetchById(cartItemId, (product) => {
    Cart.deleteById(cartItemId, product.price);
    res.redirect("/cart");
  });
  
};