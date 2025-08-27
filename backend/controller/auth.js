const User = require('../models/User')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

// register credentials

exports.postSignup = async (req, res) => {
    const { username, email, password} = req.body;


    if(!username || !email || !password ) { // check if the fields are empty
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        const user = await User.findOne({email});
        console.log(user);
        //check if the user already exists
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user' // default role is user
        });

        // save the user
        const saveUser = await newUser.save()
        console.log(saveUser);
        res.status(201).json({
            message: 'Account created successfully',
            result: saveUser
        });


    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Account creation failed"
        });
    }
};

// login credentials
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    // check if the fields are empty
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        const user = await User.findOne({email});
        console.log(user);
        // check if the user exists
        if(!user){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // Compare the password entered by the user with the password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        // check if the password does not match
        if(!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        };

        // create a token
        const token = jwt.sign(
            {id: user._id, role: user.role}, // payload
            process.env.JWT_SECRET, // secret key
            {expiresIn: "1h" } // token expires in 1hr
        )

        // send the token to the user in the response
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Login failed"
        });
 }
}

//handle for creating a casier account

exports.postCashier = async (req, res) => {
    const { username, email, password} = req.body;


    if(!username || !email || !password ) { // check if the fields are empty
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        const cashier = await User.findOne({email});
        console.log(cashier);

        //check if cashier is already exists
        if(cashier){
            return res.status(400).json({message: 'Cashier already exists'});
        }

        // hash the password 
        const hashedPasswordCashier = await bcrypt.hash(password,10);

        // save it in the databases
        const newCashier = new User({
            username,
            email,
            password: hashedPasswordCashier,
            role: 'cashier' // default role is cashier
        })
        console.log(newCashier);    
        await newCashier.save()

        //send the response to the user
        res.status(201).json({
            message: 'Cashier account created successfully',
            result: newCashier
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Account creation failed"
        });
    }
}

// getting the cashier account
exports.getCashierAccount = async (req, res) => {
    try{
        const sortOrder = req.query.sort === "desc" ? -1 : 1; // default asc
        const getCashier = await User.find({role: 'cashier'}) .sort({ username: sortOrder });
        console.log(getCashier);
        res.status(200).json({
            message: 'Cashier accounts fetched successfully',
            result: getCashier
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Cashier accounts fetching failed"
        });
    }
}

exports.getMe = async (req, res) => { // ths function is for getting the user and admin data
    try {
        const user = await User.findById(req.user.id); // this is Model for getting the user data from the database
        
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                
            },
            message: "User data fetched successfully"
        });
    } catch(err) {
        console.log("Error:", err);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};


// handle to delete cashier account 

exports.deleteCashierAccount = async (req, res) => {
 
    try{
        const {id} = req.params
        const cashier = await User.deleteOne({_id: id}) // delete the specific account via id
        console.log(cashier)

        res.status(200).json({
            message: 'Delete Cashier Succesfully'
            
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Delete Cashier Account Failed!'});
    }
}

exports.logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ message: 'Logged out successfully' });
}