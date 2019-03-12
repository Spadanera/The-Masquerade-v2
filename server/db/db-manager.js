const host = "mongodb://172.17.0.2:27017";
const dbName = "the-masquerade";
const MongoClient = require('mongodb').MongoClient;

class DbManager {
    constructor(_host) {
        this.host = _host ? _host : host;
        this.client = new MongoClient(this.host, { useNewUrlParser: true });
    }

    connect(_dbName) {
        this.dbName = _dbName ? _dbName : dbName;
        let self = this;
        return new Promise((resolve, reject) => {
            self.client.connect((err, db) => {
                if (err) throw reject(err);
                this.db = db;
                this.dbo = db.db(self.dbName);
                resolve();
            });
        });
    }

    closeConnection() {
        if (this.db) {
            this.db.close();
        }
    }

    find(collection, query) {
        let self = this;
        if (!this.dbo) {
            throw new Error("You have to connect database")
        }
        return new Promise((resolve, reject) => {
            self.dbo.collection(collection).find(query).toArray((err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
        });
    }

    findOne(collection, query) {
        let self = this;
        if (!this.dbo) {
            throw new Error("You have to connect database")
        }
        return new Promise((resolve, reject) => {
            self.dbo.collection(collection).findOne(query, (err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
        });
    }

    insertOne(collection, document) {
        let self = this;
        if (!this.dbo) {
            throw new Error("You have to connect database")
        }
        return new Promise((resolve, reject) => {
            self.dbo.collection(collection).insertOne(document, (err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
        });
    }

    updateOne(collection, query, document) {
        let self = this;
        if (!this.dbo) {
            throw new Error("You have to connect database")
        }
        return new Promise((resolve, reject) => {
            self.dbo.collection(collection).updateOne(query, { $set: document }, (err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
        });
    }

    deleteOne(collection, query) {
        let self = this;
        if (!this.dbo) {
            throw new Error("You have to connect database")
        }
        return new Promise((resolve, reject) => {
            self.dbo.collection(collection).deleteOne(query, (err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
        });
    }

    async connectAndFind(collection, query, _dbName) {
        let result;
        await this.connect(_dbName);
        try {
            result = await this.find(collection, query);
        }
        finally {
            this.closeConnection();
        }
        return result;
    }

    async connectAndFindOne(collection, query, _dbName) {
        let result;
        await this.connect(_dbName);
        try {
            result = await this.findOne(collection, query);
        }
        finally {
            this.closeConnection();
        }
        return result;
    }

    async connectAndInsertOne(collection, document, _dbName) {
        let result;
        await this.connect(_dbName);
        try {
            result = await this.insertOne(collection, document);
        }
        finally {
            this.closeConnection();
        }
        return result;
    }

    async connectAndUpdateOne(collection, query, document, _dbName) {
        let result;
        await this.connect(_dbName);
        try {
            result = await this.updateOne(collection, query, document);
        }
        finally {
            this.closeConnection();
        }
        return result;
    }

    async connectAndDeleteOne(collection, query, _dbName) {
        let result;
        await this.connect(_dbName);
        try {
            result = await this.deleteOne(collection, query);
        }
        finally {
            this.closeConnection();
        }
        return result;
    }
}

module.exports = DbManager;