
const fs = require('fs');
const path = require('path');

const p = path.join(__dirname,'..','data','cart.json');




module.exports = class Cart{
    static addCart(cart_id,cart_price){
        fs.readFile(p,(err,fileContent) => {
            let cart = {product:[],totprice: 0};
            if (!err){
                try {
                    cart = JSON.parse(fileContent);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                } 
            }
            const existingProductIndex = cart.product.findIndex(p => p.id === cart_id);
            const existingProduct = cart.product[existingProductIndex];
            let updatedProduct;
            if (existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.product = [...cart.product];
                cart.product[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:cart_id,qty:1};
                cart.product = [...cart.product,updatedProduct];

            }
            cart.totprice = cart.totprice + (+cart_price);
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
                
            })
        })
    }
    static deleteById(id,price){
        fs.readFile(p,(err,fileContent)=>{
            if(err && !fileContent){
                return;
            }
            let cart = {...JSON.parse(fileContent)};
            let product = cart.product.find(p => p.id === id);
            if (product=== null){return;}
            const productQty = product.qty;
            cart.product = cart.product.filter(p => p.id !== id);
            cart.totprice = cart.totprice - (productQty*price);

            if (cart.product.length === 0){
                cart.totprice = 0;
            }
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
                
            })
        })
    
    };
    static getCarts(cb){
        fs.readFile(p,(err,fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err){
                cb(null);
            }else{
                cb(cart);
            }
        })
    }

    
};