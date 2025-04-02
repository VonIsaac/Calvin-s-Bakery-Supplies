const Product = require('../models/Product')

exports.postProduct =  async (req, res) => {
    try{
        const {name, images, description, price, category } = req.body;
        // check if their fields a valid 
        if(!name || !images || !description || !price || !category){
            return res.status(400).json({ error: "All fields are required" });
        }

        // post a product and saved in the database
        const product = new Product({
            name,
            images,
            description,
            price,
            category
        });
        console.log(product)

        await product.save()
        return res.status(200).json({
            message: 'Post prduct succesfully',
            product
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ error: "Failed posting Products" });
    }
}