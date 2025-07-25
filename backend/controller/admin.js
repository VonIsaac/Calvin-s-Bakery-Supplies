const Product = require('../models/Product')



exports.postProduct = async (req, res) => {
        try{
            const {name, images, description, expirationDate, price, halfPrice, retailPrice, stock, category } = req.body;
            // check if their fields a valid 
            if(!name || !images || !description || !expirationDate ||  !price || !category){
                return res.status(400).json({ error: "All fields are required" });
            }

            // then check if the expirationDate is a valid date
            const expDate = new Date(expirationDate)
            if(expDate <= new Date()){
                return res.status(400).json({ error: "Expiration date must be in the future" });
            }

            // post a product and saved in the database
            const product = new Product({
                name,
                images,
                description,
                expirationDate: expDate,        
                price,
                halfPrice,
                retailPrice,
                category,
                stock
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
