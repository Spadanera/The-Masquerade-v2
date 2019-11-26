import mongoose, { mongo } from 'mongoose';

let PlayerSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    userDisplayName: String,
    userPicture: String,
    chronicleId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    active: Boolean,
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

export default mongoose.model("Player", PlayerSchema);