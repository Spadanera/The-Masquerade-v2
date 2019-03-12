"use strict";
import DbManager from "../db/db-manager";
const collectionName = "Accounts";
const mongodb = require("mongodb");

class Account {
    constructor(account) {
        this._id = account._id;
        this.email = account.email;
        this.firstName = account.firstName;
        this.lastName = account.lastName;
        this.roles = account.roles;
        this.createdAt = account.createdAt || new Date()
        this.updatedAt = account.updateAt
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
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                roles: this.roles,
                updatedAt: this.updateAt
            }
        });
    }

    async delete() {
        let collection = await DbManager.loadCollection(collectionName);
        console.log(this._id);
        return await collection.deleteOne({ _id: mongodb.ObjectID(this._id) });
    }
}

export default Account;