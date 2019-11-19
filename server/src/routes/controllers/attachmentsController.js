"use strict";

const router = require('express').Router();
const imageToUri = require('image-to-uri');
import Attachment from "../../models/Attachment";
import Chronicle from '../../models/Chronicle';
import Player from "../../models/Player";

// create attachment
router.post("/:chronicleid", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.chronicleid, storyTeller: req.session.userId });
        if (chronicle) {
            let attachment = new Attachment(req.body);
            for (let i = 0; i < attachment.playerVisibility.length; i++) {
                let player = await Player.findById(attachment.playerVisibility[i].playerId);
                attachment.playerVisibility[i].playerName = player.userDisplayName;
                attachment.playerVisibility[i].playerImage = player.userPicture;
            }
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

router.post("/file/:attachmentid", async (req, res) => {
    try {
        if (req.files && req.files.file) {
            let attachment = await Attachment.findById(req.params.attachmentid);
            attachment.file = imageToUri(req.files.file.path);
            await attachment.save();
            res.json(attachment);
        }
        else {
            throw "Missing file";
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
        let attachment = req.body;
        for (let i = 0; i < attachment.playerVisibility.length; i++) {
            let player = await Player.findById(attachment.playerVisibility[i].playerId);
            attachment.playerVisibility[i].playerName = player.userDisplayName;
            attachment.playerVisibility[i].playerImage = player.userPicture;
        }
        await Attachment.findOneAndUpdate({ _id: req.params.id }, attachment);
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
router.get("/chronicle/:chronicleid", async (req, res) => {
    try {
        let attachment = await Attachment.find({ chronicleId: req.params.chronicleid });
        res.json(attachment);
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

export default router;