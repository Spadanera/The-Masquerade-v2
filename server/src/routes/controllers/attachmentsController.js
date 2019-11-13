"use strict";

const router = require('express').Router();
import Attachment from "../../models/Attachment";
import Chronicle from '../../models/Chronicle';

// create attachment
router.post("/:chronicleid", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.chronicleid, storyTeller: req.session.userId });
        if (chronicle) {
            let attachment = new Attachment(req.body);
            await attachment.save();
            chronicle.attachments.push(attachment);
            await chronicle.save();
            res.json(attachment);
        }
        else {
            res.status(500).send("Chronacle not found");
        }
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get attachment
router.get("/:id", async (req, res) => {
    try {
        let attachment = await Attachment.findOne({ _id: req.params.id });
        res.json(attachment);
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// update attachment
router.put("/:id", async (req, res) => {
    try {
        await Attachment.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.json();
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// remove attachment
router.delete("/:id", async (req, res) => {
    try {
        let attachment = await Attachment.findOne({ _id: req.params.id });
        attachment.remove();
        res.send("Deleted");
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all attachments
router.get("(chronicle/:chronicleid", async (req, res) => {
    try {
        let attachment = await Attachment.findOne({ chronicleId: req.params.chronicleid });
        res.json(attachment);
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;