import mongoose from 'mongoose';

let CoterieSchema = new mongoose.Schema({
    name: String,
    chronicleId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    description: String,
    active: Boolean,
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

export default mongoose.model("Coterie", CoterieSchema);