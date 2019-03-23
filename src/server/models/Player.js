import mongoose from 'mongoose';
import { schema as Character } from './Character';

let PlayerSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    active: Boolean,
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }]
});

export default mongoose.model("Player", PlayerSchema);