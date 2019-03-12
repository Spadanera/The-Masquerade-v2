"use strict";

const router = require('express').Router();
import Account from "../../core/accounts";
import DbManager from "../../db/db-manager";

// Get all accounts
router.get("/", async (req, res) => {
    try {
        let collection = await DbManager.loadCollection("Accounts");
        res.json(await collection.find().toArray());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Get single account
router.get("/:id", async (req, res) => {
    try {
        let collection = await DbManager.loadCollection("Accounts");
        res.json(await collection.findOne({ _id: req.params.id }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new account
router.post("/", async (req, res) => {
    try {
        let account = new Account(req.body);
        res.json(await account.create());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Update account
router.put("/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let account = new Account(req.body);
        res.json(await account.update());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Delete account
router.delete("/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let account = new Account(req.body);
        res.json(await account.delete());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;