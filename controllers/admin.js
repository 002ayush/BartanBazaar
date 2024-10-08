const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editted:false
  });
};

exports.postEditProduct = (req,res,next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(id,title,imageUrl,description,price);
  updatedProduct.save();
  res.redirect("/products");
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};


exports.geteditProduct = (req,res,next) => {
  const editted = req.query.edit;
  console.log(editted);
  if (!editted){
    return res.redirect('/');
  }
  const productId = req.params.prodId;
  console.log(productId);
  
  Product.fetchById(productId , product => {
    res.render("admin/add-product",{
      pageTitle : "Edit Product",
      path : "/admin/edit-product",
      editted : editted,
      product : product
    })
  })
  
  
};

exports.deleteProducts = (req,res,next) => {
  const prodId = req.body.delId;
  Product.deleteById(prodId);
  res.redirect("/products");
}



exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
