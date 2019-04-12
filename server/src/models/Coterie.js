import mongoose from 'mongoose';

let CoterieSchema = new mongoose.Schema({
    name: String,
    description: String,
    active: Boolean,
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

export default mongoose.model("Coterie", CoterieSchema);