
const fs = require("fs");
const path = require("path");
const Cart = require("../models/cart");
const p = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex((p) => p.id == this.id);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
					console.log(err);
				});
			} else {
				this.id = Math.random().toString();

				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					console.log(err);
				});
			}
		});
	}

	static deleteById(id) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			const updatedProduct = products.filter((p) => p.id !== id);
			fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
				if (!err) {
					console.log("No error occurred!!");
					Cart.deleteById(id, product.price);
				}
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
	static fetchById(id, cb) {
		getProductsFromFile((products) => {
			const newproduct = products.find((p) => p.id === id);
			cb(newproduct);
		});
	}
};
