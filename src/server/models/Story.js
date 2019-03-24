import mongoose from 'mongoose';

let StorySchema = new mongoose.Schema({
    name: String,
    description: String,
    onGoing: Boolean,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
});

export default mongoose.model('Story', StorySchema);