import mongoose from 'mongoose';
import Story from './Story';
import Character from './Character';
import Chronicle from './Chronicle';

let SessionSchema = new mongoose.Schema({
    sessionDate: { type: Date, default: Date.now },
    globalNote: String,
    characters: [
        {
            characterId: mongoose.Schema.Types.ObjectId,
            characterName: String,
            experiencePoints: { type: Number, default: 0 },
            storyTellerNote: String,
            playerNote: String
        }
    ],
    completed: Boolean,
    chronicleId: mongoose.Schema.Types.ObjectId,
    storyId: mongoose.Schema.Types.ObjectId,
    storyTeller: mongoose.Schema.Types.ObjectId
});

SessionSchema.index({ "globalNote": "text", "characters.storyTellerNote": "text", "characters.playerNote": "text" });

SessionSchema.post("remove", async session => {
    let stories = await Story.find({ sessions: { $in: [session._id] } });
    Promise.all(
        stories.map(story =>
            Story.findOneAndUpdate(
                story._id,
                { $pull: { sessions: session._id } },
                { new: true }
            )
        )
    );
    await SetExperiencePointsForCharacters(session);
});

// SessionSchema.post("save", async session => {
//     await SetExperiencePointsForCharacters(session);
// });

// async function SetExperiencePointsForCharacters(session) {
//     let characters = session.characters.map(c => {
//         return {
//             characterId: c._id,
//             experiencePointsTotal: 0
//         }
//     });
//     let story = await Story.findOne({ sessions: { $in: [session._id] } });
//     let chronicle = await Chronicle.findOne({ stories: { $in: [story._id] } });
//     chronicle.stories.forEach(async s => {
//         let sessions = await Story.findById(s._id).populate("sessions");
//         sessions.forEach(s => {
//             s.characters.forEach(c => {
//                 let characterToUpdate = characters.find(character => character.characterId === s._id);
//                 if (characterToUpdate) {
//                     characterToUpdate.experiencePointsTotal += c.experiencePoints;
//                 }
//             });
//         })
//     });
//     characters.forEach(async c => await Character.findByIdAndUpdate(c.characterId, { totalExperience: c.experiencePointsTotal }));
// }

export default mongoose.model("Session", SessionSchema);