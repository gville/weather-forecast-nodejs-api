const fileSystem = require('fs')
const mongoose = require('mongoose')
const path = require('path');

main()

async function main() {
    try {
        let dbURL = "mongodb://localhost/mydatabase";
        console.log('Opening database connection:', dbURL);
        let db = await mongoose.connect(dbURL);

        await resetCollection(db, 'forecasts', './weather_data.json');

        console.log('Closing database connection');
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

async function resetCollection(db, dbCollectionName, fileName) {
    try {
        // 1. Drop existing collection, if exists
        console.log('Deleting collection:', dbCollectionName);
        try {
            await mongoose.connection.db.dropCollection(dbCollectionName);
        } catch (err) {
            // Ignore the error message issued by Mongoose
            // if the collection doesn't exist;
            // not very elegant, but it's quick and it works... ;-)
            if (err.message !== 'ns not found') {
                throw err;
            }
        }

        // 2. Load data from JSON files in the server
        let filePath = path.resolve(__dirname, fileName)
        console.log('Reading JSON file:', filePath);
        let data = fileSystem.readFileSync(filePath, 'utf8');
        let jsonDataset = JSON.parse(data);

        // 3. Insert fresh new documents in the collection
        console.log('Inserting docs in collection:', dbCollectionName);
        // 4. Transform string dates to ISODates
        jsonDataset.forEach(element => {
            element.from = new Date(element.from)
            element.to = new Date(element.to)
        });
        await mongoose.connection.db.collection(dbCollectionName).insertMany(jsonDataset)
    } catch (err) {
        throw err;
    }
}