import mongoose from 'mongoose';

const AttachmentSchema = new mongoose.Schema({
    title: String,
    file: String,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    storyTeller: mongoose.Schema.Types.ObjectId,
    chronicleId: mongoose.Schema.Types.ObjectId,
    playerVisibility: [mongoose.Schema.Types.ObjectId]
});

let Attachment = mongoose.model('Attachment', AttachmentSchema);

export default Attachment;