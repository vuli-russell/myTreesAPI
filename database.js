import mongodb from 'mongodb';
import dotenv from "dotenv";

const mongoClient = mongodb.MongoClient;
dotenv.config()

let dbName = "vulis_db";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trees.bnyoy.mongodb.net/vulis_db?retryWrites=true&w=majority`;
export const getCollectionDocuments = async (collectionName) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    mongo.close();
    return dataCollection;
}
export const createCollectionDocument = async (collectionName, data) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    if (!data._id) {
        data._id = new mongodb.ObjectID().toString();
        await mongo.db(dbName).collection(collectionName).insertOne(data)
    } else {
        updateCollectionDocument(collectionName, data);
    }
    mongo.close();
}
export const updateCollectionDocument = async (collectionName, data) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    await mongo.db(dbName).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
     );
    mongo.close();
}
export const deleteCollectionDocument = async (collectionName, _id) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    await mongo.db(dbName).collection(collectionName).deleteOne(
        { _id : _id }
     );
    mongo.close();
}