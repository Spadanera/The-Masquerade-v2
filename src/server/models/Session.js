import mongoose from 'mongoose';

let SessionSchema = new mongoose.Schema({
    sessionDate: { type: Date, default: Date.now },
    globalNote: String,
    charachters: [
        {
            characterId: mongoose.Schema.Types.ObjectId,
            experiencePoints: { type: Number, default: 0 },
            storyTellerNote: String,
            playerNote: String
        }
    ]
});

export default mongoose.model("Session", SessionSchema);