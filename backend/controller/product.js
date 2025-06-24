const Product = require('../models/Product');

exports.getAllProducts = async (req, res) =>  {
    try{
        const category = req.query.category // uses in routes for product section
        let products

        if(category){ // check if true fetch only prodcut section
            products = await Product.find({category})
        }else{ // if not fetch all the product
          products = await Product.find() 
        }
        console.log(products)

        return res.status(200).json({
            message: 'Get product Succesfully',
            products
        })
    }catch(err){
        console.error("Error fetching news:", err);
        return res.status(500).json({ error: "Failed to get products . Please try again." });
    }
}