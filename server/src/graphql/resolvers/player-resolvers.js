import Player from "../../models/Player";
import Character from "../../models/Character";

export const resolvers = {
    Query: {
        async players(parent, param, context, info) {
            return await Player.find();
        },
        async player(parent, { _id }, context, info) {
            return await Player.findById(_id).populate("characters");
        }
    },
    Player: {
        async characters(parent, param, context, info) {
            return await Character.find({ _id: { $in: parent.characters }});
        }
    }
};