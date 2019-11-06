import mongoose from 'mongoose';
import Chronicle from './Chronicle';
import Session from './Session';

let StorySchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    privateStory: String,
    publicStory: String,
    storyTeller: mongoose.Schema.Types.ObjectId,
    chronicleId: mongoose.Schema.Types.ObjectId,
    onGoing: Boolean,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
});

StorySchema.post("remove", story => {
    Chronicle.find({ stories: { $in: [story._id] } }).then(chronicles => {
        Promise.all(
            chronicles.map(chronicle =>
                Chronicle.findOneAndUpdate(
                    chronicle._id,
                    { $pull: { stories: story._id } },
                    { new: true }
                )
            )
        );
    });
    story.sessions.forEach(async element => {
        await Session.deleteOne({ _id: element });
    });
});

export default mongoose.model('Story', StorySchema);