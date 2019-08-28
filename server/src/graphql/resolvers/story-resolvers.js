import Story from "../../models/Story";
import Session from "../../models/Session";

export const resolvers = {
    Query: {
        async stories(parent, { chronicleId }, context, info) {
            return await Story.find({ chronicleId: chronicleId });
        },
        async story(parent, { _id }, context, info) {
            return await Story.findById(_id);
        }
    },
    Story: {
        async sessions(parent, param, context, info) {
            return await Session.find({ _id: { $in: parent.sessions }});
        }
    }
};