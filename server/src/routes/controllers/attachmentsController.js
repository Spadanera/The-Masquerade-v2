"use strict";

const router = require('express').Router();
const imageToUri = require('image-to-uri');
const fs = require('fs');
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
            attachment.storyTeller = req.session.userId;
            await attachment.save();
            chronicle.attachments.push(attachment);
            await chronicle.save();
            res.json(attachment);
        }
        else {
            res.status(500).send("Chronicle not found");
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
            let attachment = await Attachment.findOne({ _id: req.params.attachmentid, storyTeller: req.session.userId });
            if (attachment) {
                if (/image/.test(attachment.type)) {
                    attachment.file = imageToUri(req.files.file.path);
                }
                attachment.base64 = base64_encode(req.files.file.path);
                await attachment.save();
                res.json(attachment);
            }
            else {
                throw new Error("Attachment noy found");
            }
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
router.get("/:chronicleid", async (req, res) => {
    try {
        let attachment = await Attachment.findOne(getQuery(req, { _id: req.params.chronicleid }));
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
        await Attachment.findOneAndUpdate({ _id: req.params.id, storyTeller: req.session.userId }, attachment);
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
        let attachment = await Attachment.findOne({ _id: req.params.id, storyTeller: req.session.userId });
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
        let attachment = await Attachment.find(await getQuery(req, { chronicleId: req.params.chronicleid }));
        res.json(attachment);
    }

    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

async function getQuery(req, query) {
    if (req.session.role === "story-teller") {
        query.storyTeller = req.session.userId;
    }
    else {
        let player = await Player.findOne({ chronicleId: req.params.chronicleid, userId: req.session.userId });
        query["playerVisibility.playerId"] = player._id;
    }
    return query;
}

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

export default router;