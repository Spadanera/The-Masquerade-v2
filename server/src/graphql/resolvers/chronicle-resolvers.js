import Chronicle from "../../models/Chronicle";
import Player from "../../models/Player";
import Coterie from "../../models/Coterie";
import Story from "../../models/Story";

export const resolvers = {
    Query: {
        async chronicles(parent, {}, context, info) {
            return await Chronicle.find();
        },
        async chronicle(parent, { _id }, context, info) {
            return await Chronicle.findById(_id);
        }
    },
    Chronicle: {
        async players(parent, {}, context, info) {
            return await Player.find({ _id: { $in: parent.players } });
        },
        async coteries(parent, {}, context, info) {
            return await Coterie.find({ _id: { $in: parent.coteries } });
        },
        async stories(parent, {}, context, info) {
            return await Story.find({ _id: { $in: parent.stories } });
        }
    }
}