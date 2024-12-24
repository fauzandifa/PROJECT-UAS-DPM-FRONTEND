const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Function to check collections status
const checkCollections = async (conn) => {
    try {
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('\n=== Collections Status ==='.cyan.bold);
        for (const collection of collections) {
            const count = await conn.connection.db.collection(collection.name).countDocuments();
            console.log(`✓`.green.bold + ` Collection: ${collection.name.yellow}`);
            console.log(`  Documents: ${count}`.cyan);
        }
        console.log('========================\n'.cyan.bold);
    } catch (error) {
        console.error('Error checking collections:', error);
    }
};

// Enhanced Database Connection with Loading Animation
const enhancedConnect = async () => {
    const frames = ['-', '\\', '|', '/'];
    let frameIndex = 0;

    const loadingInterval = setInterval(() => {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${frames[frameIndex]} Connecting to MongoDB...`.cyan);
        frameIndex = (frameIndex + 1) % frames.length;
    }, 100);

    try {
        const conn = await connectDB();
        clearInterval(loadingInterval);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        
        console.log('✓ Connection successful!'.green.bold);
        console.log('\n=== Database Connection Status ==='.cyan.bold);
        console.log('✓'.green.bold + ' MongoDB Connected:'.cyan, conn.connection.host.yellow);
        console.log('✓'.green.bold + ' Database Name:'.cyan, conn.connection.name.yellow);
        console.log('✓'.green.bold + ' Connection State:'.cyan, 'Connected'.green);
        console.log('=====================================\n'.cyan.bold);

        // Check collections after successful connection
        await checkCollections(conn);

    } catch (error) {
        clearInterval(loadingInterval);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.error('× Database Connection Error:'.red.bold, error.message);
        process.exit(1);
    }
};

// Routes
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/movies', require('./routes/movieRoutes'));

// Tambahkan route untuk mengecek status collections
app.get('/api/status', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const status = {};
        
        for (const collection of collections) {
            const count = await mongoose.connection.db.collection(collection.name).countDocuments();
            status[collection.name] = {
                exists: true,
                documentCount: count
            };
        }
        
        res.json({
            database: mongoose.connection.name,
            collections: status
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Initialize connection with loading animation
console.log('\n🚀 Initializing TiketKu API Server...'.cyan.bold);
enhancedConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n✓`.green.bold + ` Server running on port`.cyan + ` ${PORT}`.yellow);
});