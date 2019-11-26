import mongoose from 'mongoose';

let PlaceSchema = new mongoose.Schema({
    storyTellerId: mongoose.Schema.Types.ObjectId,
    chronicleId: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    gmaps: String,
    playerVisibility: [{
        playerId: mongoose.Schema.Types.ObjectId,
        playerName: String,
        playerImage: String
    }]
});

export default mongoose.model("Place", PlaceSchema);