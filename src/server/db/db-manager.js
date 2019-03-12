const host = "mongodb://172.17.0.2:27017";
const dbName = "the-masquerade";
const mongodb = require("mongodb");

class DbManager {
    constructor(_host) {
        this.host = _host ? _host : host;
        this.client = new MongoClient(this.host, { useNewUrlParser: true });
    }

    static async loadCollection(collectionName, _dbName) {
        const client = await mongodb.MongoClient.connect(host, { useNewUrlParser: true });
        return client.db(_dbName ? _dbName : dbName).collection(collectionName);
    }
}

export default DbManager;