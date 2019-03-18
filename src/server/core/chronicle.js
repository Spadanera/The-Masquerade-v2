"use strict";
import DbManager from "../db/db-manager";
const collectionName = "Chronicles";
const mongodb = require("mongodb");

class Chronicle {
    constructor(chronicle) {
        this._id = chronicle._id;
        this.name = chronicle.name;
        this.description = chronicle.description;
        this.status = chronicle.status || "Draft";
        this.storyTeller = chronicle.storyTeller;
        this.createdAt = chronicle.createdAt || new Date();
        this.updatedAt = chronicle.updateAt;
    }

    async create() {
        let collection = await DbManager.loadCollection(collectionName);
        return await collection.insertOne(this);
    }

    async update() {
        let collection = await DbManager.loadCollection(collectionName);
        this.updateAt = new Date();
        return await collection.updateOne({ _id: mongodb.ObjectID(this._id) }, {
            $set: {
                name: this.name,
                description: this.description,
                updatedAt: this.updateAt
            }
        });
    }

    async delete() {
        let collection = await DbManager.loadCollection(collectionName);
        console.log(this._id);
        return await collection.deleteOne({ _id: mongodb.ObjectID(this._id) });
    }

    async setStatus(status) {
        let collection = await DbManager.loadCollection(collectionName);
        this.updateAt = new Date();
        this.status = status;
        return await collection.updateOne({ _id: mongodb.ObjectID(this._id) }, {
            $set: {
                status: this.status,
                updatedAt: this.updateAt
            }
        });
    }
}

export default Chronicle;