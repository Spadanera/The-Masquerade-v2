"use strict";

const router = require('express').Router();
import Story from "../../core/stories";

const stories = [
    {
        id: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
        name: "Prima storia"
    },
    {
        id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
        name: "Seconda storia"
    }
];

// Get all stories
router.get("/", (req, res) => { 
    res.json(stories); 
});

// Get single story
router.get("/:id", (req, res) => { 
    res.json(stories.find(s => s.id === req.params.id)); 
});

// Create new story
router.post("/", (req, res) => {
    let newStory = new Story(req.body.name);
    stories.push(newStory); 
    res.json(newStory);
});

// Update Story
router.put("/:id", (req, res) => {
    let story = stories.find( s => s.id === req.params.id);
    story.name = req.body.name ? req.body.name : story.name;
    res.json(story);
});

export default router;