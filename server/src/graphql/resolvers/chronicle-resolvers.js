import Chronicle from "../../models/Chronicle";
import Player from "../../models/Player";
import Coterie from "../../models/Coterie";
import Story from "../../models/Story";

export const resolvers = {
    Query: {
        async chronicles(parent, { filter }, context, info) {
            filter = filter || "{}";
            return await Chronicle.find(JSON.parse(filter));
        },
        async chronicle(parent, { _id }, context, info) {
            return await Chronicle.findById(_id);
        }
    },
    Chronicle: {
        async players(parent, { }, context, info) {
            return await Player.find({ _id: { $in: parent.players } });
        },
        async coteries(parent, { }, context, info) {
            return await Coterie.find({ _id: { $in: parent.coteries } });
        },
        async stories(parent, { }, context, info) {
            return await Story.find({ _id: { $in: parent.stories } });
        }
    },
    Mutation: {
        async upsertChronicle(parent, { input }, context, info) {
            if (input) {
                if (input._id) {
                    return await Chronicle.findOneAndUpdate({ _id: input._id }, input);
                }
                else {
                    // input.storyTeller = context.session.userId;
                    let chronicleDb = new Chronicle(input);
                    await chronicleDb.save();
                    return chronicleDb;
                }
            }
        },
        async deleteChronicle(parent, { _id }, context, info) {
            try {
                let chronicleDb = await Chronicle.findOne({ _id: _id });
                await chronicleDb.remove();
                return _id;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
}