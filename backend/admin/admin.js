const User = require('../models/User');
const bcrypt = require('bcryptjs');


async function createAdminUser(){
    try{
        // create a deafualt admin user
        const deafaulltAdmin = await User.findOne({email:'admin@gmail.com'})
        //check if the admin user already exists
        if(deafaulltAdmin){
            return console.log('Admin user already exists');
        }

        // hash the password
        const hashedAdminPassword = await bcrypt.hash('admin123', 10)

        // create a new admin user
        const admin  = new User({
            username: 'Admin',
            email: 'admin@gmail.com',
            password: hashedAdminPassword,
            role: 'admin' // default role is admin
        })
        // save the admin user
        await admin.save()
        //console.log(saveAdmin);

    }catch(err){
        console.log(err);
      
    }
}


module.exports = {createAdminUser}