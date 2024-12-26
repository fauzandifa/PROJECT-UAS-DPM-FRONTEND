const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Pastikan URI menggunakan nama database yang benar
        const MONGODB_URI = 'mongodb://localhost:27017/PROJECT-UAS';
        
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Verifikasi koneksi ke collection yang benar
        const db = conn.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;