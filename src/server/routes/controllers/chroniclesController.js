"use strict";

const router = require('express').Router();
import Chronicle from "../../core/chronicle";
import DbManager from "../../db/db-manager";
const collectionName = "Chronicles"

// Get all chronicles
router.get("/", async (req, res) => {
    try {
        let collection = await DbManager.loadCollection(collectionName);
        res.json(await collection.find().toArray());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Get single chronicle
router.get("/:id", async (req, res) => {
    try {
        let collection = await DbManager.loadCollection(collectionName);
        res.json(await collection.findOne({ _id: req.params.id }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new chronicle
router.post("/", async (req, res) => {
    try {
        let account = new Chronicle(req.body);
        res.json(await account.create());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Update chronicle
router.put("/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let chronicle = new Chronicle(req.body);
        res.json(await chronicle.update());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Delete chronicle
router.delete("/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let chronicle = new Chronicle(req.body);
        res.json(await chronicle.delete());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/archive/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let chronicle = new Chronicle(req.body);
        res.json(await chronicle.setStatus("Archived"));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/activate/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let chronicle = new Chronicle(req.body);
        res.json(await chronicle.setStatus("Live"));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/resume/:id", async (req, res) => {
    try {
        req.body._id = req.params.id;
        let chronicle = new Chronicle(req.body);
        res.json(await chronicle.setStatus("Draft"));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;