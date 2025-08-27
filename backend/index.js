const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const  mongoDbConnect = require('./utils/database');


// Import routes
const authRoutes = require('./routes/auth'); 
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product')

//admin user creation
const {createAdminUser} = require('./admin/admin');

// Serve the static files from the React app
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses form-urlencoded request
if(process.env.NODE_ENV !== 'production'){
    app.use(cors({
        origin: 'http://localhost:5173', // Specify the frontend origin
        credentials: true, // Allow cookies and authentication headers
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
}




mongoDbConnect();
createAdminUser(); // create a default admin user
app.use('/user', authRoutes);
app.use('/admin', adminRoutes)
app.use('/product', productRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })

}
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
