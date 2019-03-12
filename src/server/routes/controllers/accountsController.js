"use strict";

const router = require('express').Router();
import Account from "../../core/accounts";
import DbManager from "../../db/db-manager";

// Get all accounts
router.get("/", async (req, res) => {
    try {
        try {
            let dbManager = new DbManager();
            res.send(await dbManager.connectAndFind("Accounts"));
        }
        catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.json(e);
        }
    }
    catch (e) {
        res.statusCode = 500;
        res.send(e);
    }
});

// Get single account
router.get("/:id", async (req, res) => {
    try {
        let dbManager = new DbManager();
        res.send(await dbManager.connectAndFindOne("Accounts", { id: req.params.id }));
    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.json(e);
    }
});

// Create new account
router.post("/", async (req, res) => {
    try {
        let account = new Account(req.body);
        await account.save()
        res.json(newAccount);
    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send(e);
    }
});

// Update account
router.put("/:id", async (req, res) => {
    try {
        req.body.id = req.params.id;
        let account = new Account(req.body);
        await account.update()
        res.json(account);
    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send(e);
    }
});

// Delete account
router.delete("/:id", async (req, res) => {
    try {
        req.body.id = req.params.id;
        let account = new Account(req.body);
        await account.delete();
        res.json(account);
    }
    catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send(e);
    }
});

export default router;