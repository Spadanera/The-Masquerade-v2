import mongoose from 'mongoose';
//import { schema as Session } from './Session';

let StorySchema = new mongoose.Schema({
    name: String,
    description: String,
    onGoing: Boolean,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    //sessions: [Session]
});

export default mongoose.model('Story', StorySchema);