import mongoose from 'mongoose';

let InvitationSchema = new mongoose.Schema({
    storyTellerId: mongoose.Schema.Types.ObjectId,
    chronicleId: mongoose.Schema.Types.ObjectId,
    emailAddress: String,
    token: String
});

export default mongoose.model("Invitation", InvitationSchema);